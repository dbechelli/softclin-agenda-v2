import { useState, useEffect } from 'react'
import { db } from './lib/db'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { Calendar } from 'lucide-react'

function App() {
  const [events, setEvents] = useState([])
  const [profissionaisConfig, setProfissionaisConfig] = useState({})

  useEffect(() => {
    carregarProfissionais()
    carregarAgendamentos()
  }, [])

  const carregarProfissionais = async () => {
    try {
      const { data, error } = await db.select('profissionais', {
        filters: { ativo: true }
      })

      if (error) throw error
      
      // Criar mapa de configurações por nome_exibicao
      const configMap = {}
      data?.forEach(prof => {
        configMap[prof.nome_exibicao] = prof.config_atendimento || {
          duracao_consulta: 30,
          primeira_consulta_duracao: 60,
          retorno_duracao: 30
        }
      })
      setProfissionaisConfig(configMap)
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error)
    }
  }

  const carregarAgendamentos = async () => {
    try {
      const { data, error } = await db.select('agendamentos', {
        orderBy: 'data_consulta',
        ascending: true
      })

      if (error) throw error

      const eventosFormatados = data.map(agendamento => {
        // Buscar configuração do profissional
        const config = profissionaisConfig[agendamento.profissional] || {
          duracao_consulta: 30,
          primeira_consulta_duracao: 60
        }

        // Determinar duração baseado se é primeira consulta
        const duracao = agendamento.primeira_consulta 
          ? config.primeira_consulta_duracao 
          : config.duracao_consulta

        // Converter data_consulta para data correta
        let dataConsulta = new Date(agendamento.data_consulta)
        
        // Se a data vier com T00:00:00Z, precisa ajustar para local
        if (typeof agendamento.data_consulta === 'string') {
          const [ano, mes, dia] = agendamento.data_consulta.substring(0, 10).split('-')
          dataConsulta = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia))
        }
        
        // Combinar data com hora
        const [hora, minuto] = agendamento.hora_consulta.split(':')
        const inicio = new Date(dataConsulta)
        inicio.setHours(parseInt(hora), parseInt(minuto), 0, 0)
        
        const fim = new Date(inicio.getTime() + duracao * 60000)

        // Definir cores baseado no status (agendado, confirmado, cancelado, realizado)
        let backgroundColor = '#1f93ff' // Azul padrão
        let borderColor = '#1f93ff'
        
        const status = agendamento.status?.toLowerCase() || 'agendado'
        
        if (status === 'confirmado') {
          backgroundColor = '#44ce4b' // Verde
          borderColor = '#44ce4b'
        } else if (status === 'cancelado') {
          backgroundColor = '#f44336' // Vermelho
          borderColor = '#f44336'
        } else if (status === 'pendente') {
          backgroundColor = '#ffc532' // Amarelo
          borderColor = '#ffc532'
        } else if (status === 'realizado') {
          backgroundColor = '#9e9e9e' // Cinza
          borderColor = '#9e9e9e'
        }

        return {
          id: agendamento.id,
          title: `${agendamento.primeira_consulta ? '📋 ' : ''}${agendamento.nome_paciente} - ${agendamento.profissional}`,
          start: inicio.toISOString(),
          end: fim.toISOString(),
          backgroundColor,
          borderColor,
          extendedProps: {
            paciente: agendamento.nome_paciente,
            profissional: agendamento.profissional,
            tipo_consulta: agendamento.tipo_consulta,
            status: agendamento.status,
            observacoes: agendamento.observacoes,
            primeira_consulta: agendamento.primeira_consulta,
            duracao: duracao
          }
        }
      })

      setEvents(eventosFormatados)
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
    }
  }

  // Recarregar quando as configurações mudarem
  useEffect(() => {
    if (Object.keys(profissionaisConfig).length > 0) {
      carregarAgendamentos()
    }
  }, [profissionaisConfig])

  const handleEventClick = (clickInfo) => {
    const { extendedProps } = clickInfo.event
    
    let statusTexto = ''
    switch(extendedProps.status) {
      case 'confirmado':
        statusTexto = '✅ Confirmado'
        break
      case 'pendente':
        statusTexto = '⏳ Pendente'
        break
      case 'cancelado':
        statusTexto = '❌ Cancelado'
        break
      default:
        statusTexto = extendedProps.status
    }

    alert(`
📅 Detalhes do Agendamento

👤 Paciente: ${extendedProps.paciente}
👨‍⚕️ Profissional: ${extendedProps.profissional}
${extendedProps.primeira_consulta ? '📋 Primeira Consulta\n' : ''}
⏱️ Duração: ${extendedProps.duracao} minutos
🩺 Tipo: ${extendedProps.tipo_consulta}
📊 Status: ${statusTexto}

${extendedProps.observacoes ? `📝 Observações: ${extendedProps.observacoes}` : ''}
    `)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        padding: '20px 40px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Calendar size={32} color="#1f93ff" />
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#2d3748' }}>
            Endoclin Agenda
          </h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main style={{ padding: '30px 40px' }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={ptBrLocale}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia'
            }}
            events={events}
            eventClick={handleEventClick}
            slotMinTime="06:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            height="auto"
            slotDuration="00:15:00"
            slotLabelInterval="01:00"
            expandRows={true}
            stickyHeaderDates={true}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '20px',
        textAlign: 'center',
        color: '#718096',
        fontSize: '14px'
      }}>
        <p>EndoClin - Agenda © 2025 - Sistema de Agendamento Médico</p>
      </footer>
    </div>
  )
}

export default App
