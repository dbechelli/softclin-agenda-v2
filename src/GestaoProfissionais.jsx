import { useState, useEffect } from 'react'
import { db } from './lib/db'
import { 
  User, Clock, Stethoscope, XCircle, CreditCard, 
  Brain, MessageSquare, Save, Plus, Trash2, AlertCircle 
} from 'lucide-react'
import AbaHorarios from './components/AbaHorarios'
import AbaCompetencias from './components/AbaCompetencias'
import AbaRestricoes from './components/AbaRestricoes'
import AbaConvenios from './components/AbaConvenios'
import AbaPerfilIA from './components/AbaPerfilIA'
import AbaComunicacao from './components/AbaComunicacao'

const diasSemana = [
  { key: 'segunda', label: 'Segunda-feira' },
  { key: 'terca', label: 'Terça-feira' },
  { key: 'quarta', label: 'Quarta-feira' },
  { key: 'quinta', label: 'Quinta-feira' },
  { key: 'sexta', label: 'Sexta-feira' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' }
]

function GestaoProfissionais() {
  const [profissionais, setProfissionais] = useState([])
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null)
  const [abaAtiva, setAbaAtiva] = useState('horarios')
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    nome_completo: '',
    nome_exibicao: '',
    especialidade: '',
    crm_registro: '',
    email: '',
    telefone: '',
    ativo: true,
    config_atendimento: {
      // Horários
      horarios: {},
      duracao_consulta: 30,
      primeira_consulta_duracao: 60,
      retorno_duracao: 30,
      intervalo_entre_consultas: 10,
      max_consultas_dia: 12,
      aceita_encaixe: true,
      almoco: { inicio: '', fim: '' },
      
      // Competências
      especialidades: [],
      procedimentos_que_realiza: [],
      procedimentos_que_nao_realiza: [],
      
      // Restrições
      restricoes: {
        idade_minima: null,
        idade_maxima: null,
        nao_atende: [],
        condicoes_especiais: []
      },
      
      // Convênios
      formas_atendimento: {
        aceita_particular: true,
        valor_consulta_particular: 0,
        valor_primeira_consulta: 0,
        aceita_convenios: true,
        convenios_atendidos: [],
        aceita_online: false
      },
      
      // Perfil IA
      perfil_ia: {
        bio: '',
        formacao: [],
        areas_expertise: [],
        idiomas: [],
        diferenciais: [],
        indicado_para: []
      },
      
      // Comunicação
      comunicacao: {
        aceita_contato_whatsapp: true,
        tempo_resposta_medio: '',
        disponivel_urgencias: false,
        plantao_fim_semana: false
      }
    }
  })

  useEffect(() => {
    carregarProfissionais()
  }, [])

  const carregarProfissionais = async () => {
    try {
      const { data, error } = await db.select('profissionais', {
        orderBy: 'nome_exibicao'
      })

      if (error) throw error
      setProfissionais(data || [])
    } catch (error) {
      mostrarMensagem('erro', 'Erro ao carregar profissionais: ' + error.message)
    }
  }

  const selecionarProfissional = (prof) => {
    setProfissionalSelecionado(prof.id)
    setFormData({
      ...prof,
      config_atendimento: prof.config_atendimento || formData.config_atendimento
    })
  }

  const novoProfissional = () => {
    setProfissionalSelecionado('novo')
    setFormData({
      nome_completo: '',
      nome_exibicao: '',
      especialidade: '',
      crm_registro: '',
      email: '',
      telefone: '',
      ativo: true,
      config_atendimento: formData.config_atendimento
    })
  }

  const salvarProfissional = async () => {
    setLoading(true)
    try {
      if (profissionalSelecionado === 'novo') {
        const { error } = await db.insert('profissionais', formData)
        
        if (error) throw error
        mostrarMensagem('sucesso', 'Profissional criado com sucesso!')
      } else {
        const { error } = await db.update('profissionais', formData, {
          id: profissionalSelecionado
        })
        
        if (error) throw error
        mostrarMensagem('sucesso', 'Profissional atualizado com sucesso!')
      }
      
      await carregarProfissionais()
      setProfissionalSelecionado(null)
    } catch (error) {
      mostrarMensagem('erro', 'Erro ao salvar: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const mostrarMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto })
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 5000)
  }

  const updateConfig = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev }
      const keys = path.split('.')
      let current = newData.config_atendimento
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const adicionarItem = (path, item) => {
    const current = getNestedValue(formData.config_atendimento, path)
    updateConfig(path, [...current, item])
  }

  const removerItem = (path, index) => {
    const current = getNestedValue(formData.config_atendimento, path)
    updateConfig(path, current.filter((_, i) => i !== index))
  }

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  const toggleDia = (dia) => {
    const horarios = { ...formData.config_atendimento.horarios }
    if (horarios[dia]?.length > 0) {
      horarios[dia] = []
    } else {
      horarios[dia] = [{ inicio: '08:00', fim: '18:00' }]
    }
    updateConfig('horarios', horarios)
  }

  const adicionarPeriodo = (dia) => {
    const horarios = { ...formData.config_atendimento.horarios }
    if (!horarios[dia]) horarios[dia] = []
    horarios[dia].push({ inicio: '08:00', fim: '18:00' })
    updateConfig('horarios', horarios)
  }

  const removerPeriodo = (dia, index) => {
    const horarios = { ...formData.config_atendimento.horarios }
    horarios[dia].splice(index, 1)
    updateConfig('horarios', horarios)
  }

  const updatePeriodo = (dia, index, campo, valor) => {
    const horarios = { ...formData.config_atendimento.horarios }
    horarios[dia][index][campo] = valor
    updateConfig('horarios', horarios)
  }

  if (!profissionalSelecionado) {
    return (
      <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748' }}>
            Gestão de Profissionais
          </h1>
          <button
            onClick={novoProfissional}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#1f93ff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Plus size={18} />
            Novo Profissional
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {profissionais.map(prof => (
            <div
              key={prof.id}
              onClick={() => selecionarProfissional(prof)}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1f93ff'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <User size={24} color="#1f93ff" />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                    {prof.nome_exibicao}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#718096' }}>
                    {prof.especialidade}
                  </p>
                </div>
              </div>
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                background: prof.ativo ? '#e8f5e9' : '#ffebee',
                color: prof.ativo ? '#2e7d32' : '#c62828'
              }}>
                {prof.ativo ? 'Ativo' : 'Inativo'}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <button
            onClick={() => setProfissionalSelecionado(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#1f93ff',
              cursor: 'pointer',
              fontSize: '14px',
              marginBottom: '10px'
            }}
          >
            ← Voltar
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748' }}>
            {profissionalSelecionado === 'novo' ? 'Novo Profissional' : 'Editar Profissional'}
          </h1>
        </div>
        <button
          onClick={salvarProfissional}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: '#44ce4b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          <Save size={18} />
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>

      {/* Mensagem */}
      {mensagem.texto && (
        <div style={{
          padding: '15px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: mensagem.tipo === 'sucesso' ? '#e8f5e9' : '#ffebee',
          color: mensagem.tipo === 'sucesso' ? '#2e7d32' : '#c62828',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertCircle size={20} />
          {mensagem.texto}
        </div>
      )}

      {/* Dados Básicos */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#2d3748', marginBottom: '20px' }}>
          Dados Básicos
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <label style={labelStyle}>Nome Completo *</label>
            <input
              type="text"
              value={formData.nome_completo}
              onChange={(e) => setFormData({ ...formData, nome_completo: e.target.value })}
              style={inputStyle}
              placeholder="Dr. João da Silva"
            />
          </div>

          <div>
            <label style={labelStyle}>Nome de Exibição *</label>
            <input
              type="text"
              value={formData.nome_exibicao}
              onChange={(e) => setFormData({ ...formData, nome_exibicao: e.target.value })}
              style={inputStyle}
              placeholder="Dr. João Silva"
            />
          </div>

          <div>
            <label style={labelStyle}>Especialidade *</label>
            <input
              type="text"
              value={formData.especialidade}
              onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
              style={inputStyle}
              placeholder="Gastroenterologia"
            />
          </div>

          <div>
            <label style={labelStyle}>CRM/Registro</label>
            <input
              type="text"
              value={formData.crm_registro}
              onChange={(e) => setFormData({ ...formData, crm_registro: e.target.value })}
              style={inputStyle}
              placeholder="CRM/SP 123456"
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
              placeholder="joao.silva@clinica.com"
            />
          </div>

          <div>
            <label style={labelStyle}>Telefone</label>
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              style={inputStyle}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={formData.ativo}
            onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
            style={{ width: 'auto', cursor: 'pointer' }}
          />
          <label style={{ fontSize: '14px', color: '#4a5568', cursor: 'pointer' }}>
            Profissional Ativo
          </label>
        </div>
      </div>

      {/* Abas */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Menu de Abas */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #f0f3f7',
          overflowX: 'auto'
        }}>
          {[
            { id: 'horarios', label: 'Horários', icon: Clock },
            { id: 'competencias', label: 'Competências', icon: Stethoscope },
            { id: 'restricoes', label: 'Restrições', icon: XCircle },
            { id: 'convenios', label: 'Convênios', icon: CreditCard },
            { id: 'perfil_ia', label: 'Perfil IA', icon: Brain },
            { id: 'comunicacao', label: 'Comunicação', icon: MessageSquare }
          ].map(aba => {
            const Icon = aba.icon
            return (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                style={{
                  flex: '1',
                  minWidth: '120px',
                  padding: '15px 20px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: abaAtiva === aba.id ? '#1f93ff' : '#718096',
                  borderBottom: abaAtiva === aba.id ? '3px solid #1f93ff' : '3px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={18} />
                {aba.label}
              </button>
            )
          })}
        </div>

        {/* Conteúdo das Abas */}
        <div style={{ padding: '25px' }}>
          {abaAtiva === 'horarios' && (
            <AbaHorarios
              formData={formData}
              updateConfig={updateConfig}
              toggleDia={toggleDia}
              adicionarPeriodo={adicionarPeriodo}
              removerPeriodo={removerPeriodo}
              updatePeriodo={updatePeriodo}
            />
          )}

          {abaAtiva === 'competencias' && (
            <AbaCompetencias
              config={formData.config_atendimento}
              adicionarItem={adicionarItem}
              removerItem={removerItem}
            />
          )}

          {abaAtiva === 'restricoes' && (
            <AbaRestricoes
              config={formData.config_atendimento}
              updateConfig={updateConfig}
              adicionarItem={adicionarItem}
              removerItem={removerItem}
            />
          )}

          {abaAtiva === 'convenios' && (
            <AbaConvenios
              config={formData.config_atendimento}
              updateConfig={updateConfig}
              adicionarItem={adicionarItem}
              removerItem={removerItem}
            />
          )}

          {abaAtiva === 'perfil_ia' && (
            <AbaPerfilIA
              config={formData.config_atendimento}
              updateConfig={updateConfig}
              adicionarItem={adicionarItem}
              removerItem={removerItem}
            />
          )}

          {abaAtiva === 'comunicacao' && (
            <AbaComunicacao
              config={formData.config_atendimento}
              updateConfig={updateConfig}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Estilos reutilizáveis
const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '500',
  color: '#4a5568',
  marginBottom: '8px'
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '2px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '14px',
  transition: 'all 0.2s'
}

export default GestaoProfissionais
