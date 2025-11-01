import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { Calendar, Users, Settings } from 'lucide-react'
import GestaoProfissionais from './GestaoProfissionais'

function App() {
  const [view, setView] = useState('calendar')
  const [events, setEvents] = useState([])
  const [profissionais, setProfissionais] = useState([])
  const [profissionaisConfig, setProfissionaisConfig] = useState({})

  useEffect(() => {
    carregarProfissionais()
    carregarAgendamentos()
  }, [])

  const carregarProfissionais = async () => {
    try {
      const { data, error } = await supabase
        .from('profissionais')
        .select('*')
        .eq('ativo', true)

      if (error) throw error
      
      setProfissionais(data || [])
      
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
      const { data, error } = await supabase
        .from('agendamentos')
        .select('*')
        .order('data_consulta', { ascending: true })

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

        // Calcular horário de término
        const [hora, minuto] = agendamento.hora_consulta.split(':')
        const inicio = new Date(`${agendamento.data_consulta}T${agendamento.hora_consulta}`)
        const fim = new Date(inicio.getTime() + duracao * 60000)

        // Definir cores baseado no status (cores do Chatwoot)
        let backgroundColor = '#1f93ff' // Azul Chatwoot
        let borderColor = '#1f93ff'
        
        if (agendamento.status === 'confirmado') {
          backgroundColor = '#44ce4b' // Verde Chatwoot
          borderColor = '#44ce4b'
        } else if (agendamento.status === 'cancelado') {
          backgroundColor = '#f44336' // Vermelho
          borderColor = '#f44336'
        } else if (agendamento.status === 'pendente') {
          backgroundColor = '#ffc532' // Amarelo Chatwoot
          borderColor = '#ffc532'
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
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Calendar size={32} color="#1f93ff" />
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#2d3748' }}>
            Endoclin Agenda
          </h1>
        </div>

        <nav style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setView('calendar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: view === 'calendar' ? '#1f93ff' : 'white',
              color: view === 'calendar' ? 'white' : '#4a5568',
              border: view === 'calendar' ? 'none' : '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Calendar size={18} />
            Calendário
          </button>

          <button
            onClick={() => setView('profissionais')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: view === 'profissionais' ? '#1f93ff' : 'white',
              color: view === 'profissionais' ? 'white' : '#4a5568',
              border: view === 'profissionais' ? 'none' : '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Users size={18} />
            Profissionais
          </button>
        </nav>
      </header>

      {/* Conteúdo */}
      <main style={{ padding: '30px 40px' }}>
        {view === 'calendar' ? (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
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
        ) : (
          <GestaoProfissionais />
        )}
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
