import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

const diasSemana = [
  { key: 'segunda', label: 'Segunda-feira' },
  { key: 'terca', label: 'Terça-feira' },
  { key: 'quarta', label: 'Quarta-feira' },
  { key: 'quinta', label: 'Quinta-feira' },
  { key: 'sexta', label: 'Sexta-feira' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' }
]

function AbaHorarios({ formData, updateConfig, toggleDia, adicionarPeriodo, removerPeriodo, updatePeriodo }) {
  const config = formData.config_atendimento

  return (
    <div>
      {/* Configurações Gerais */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '20px' }}>
          Configurações de Consultas
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <label style={labelStyle}>Duração Consulta (min)</label>
            <input
              type="number"
              value={config.duracao_consulta}
              onChange={(e) => updateConfig('duracao_consulta', parseInt(e.target.value))}
              style={inputStyle}
              min="10"
              max="120"
            />
          </div>

          <div>
            <label style={labelStyle}>Primeira Consulta (min)</label>
            <input
              type="number"
              value={config.primeira_consulta_duracao}
              onChange={(e) => updateConfig('primeira_consulta_duracao', parseInt(e.target.value))}
              style={inputStyle}
              min="10"
              max="180"
            />
          </div>

          <div>
            <label style={labelStyle}>Retorno (min)</label>
            <input
              type="number"
              value={config.retorno_duracao}
              onChange={(e) => updateConfig('retorno_duracao', parseInt(e.target.value))}
              style={inputStyle}
              min="10"
              max="120"
            />
          </div>

          <div>
            <label style={labelStyle}>Intervalo Entre Consultas (min)</label>
            <input
              type="number"
              value={config.intervalo_entre_consultas}
              onChange={(e) => updateConfig('intervalo_entre_consultas', parseInt(e.target.value))}
              style={inputStyle}
              min="0"
              max="60"
            />
          </div>

          <div>
            <label style={labelStyle}>Máx Consultas/Dia</label>
            <input
              type="number"
              value={config.max_consultas_dia}
              onChange={(e) => updateConfig('max_consultas_dia', parseInt(e.target.value))}
              style={inputStyle}
              min="1"
              max="50"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '30px' }}>
            <input
              type="checkbox"
              checked={config.aceita_encaixe}
              onChange={(e) => updateConfig('aceita_encaixe', e.target.checked)}
              style={{ width: 'auto', cursor: 'pointer' }}
            />
            <label style={{ fontSize: '14px', color: '#4a5568', cursor: 'pointer' }}>
              Aceita Encaixe
            </label>
          </div>
        </div>
      </div>

      {/* Horário de Almoço */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '20px' }}>
          Horário de Almoço
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '400px' }}>
          <div>
            <label style={labelStyle}>Início</label>
            <input
              type="time"
              value={config.almoco?.inicio || ''}
              onChange={(e) => updateConfig('almoco', { ...config.almoco, inicio: e.target.value })}
              style={inputStyle}
            />
          </div>
          
          <div>
            <label style={labelStyle}>Fim</label>
            <input
              type="time"
              value={config.almoco?.fim || ''}
              onChange={(e) => updateConfig('almoco', { ...config.almoco, fim: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Horários por Dia */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '20px' }}>
          Dias e Horários de Atendimento
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {diasSemana.map(dia => {
            const ativo = config.horarios?.[dia.key]?.length > 0
            
            return (
              <div
                key={dia.key}
                style={{
                  border: `2px solid ${ativo ? '#1f93ff' : '#e0e6ed'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  background: ativo ? '#f0f4ff' : '#f9f9f9',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    fontWeight: '600',
                    fontSize: '15px',
                    color: '#2d3748'
                  }}>
                    {dia.label}
                  </span>
                  
                  <button
                    onClick={() => toggleDia(dia.key)}
                    style={{
                      width: '50px',
                      height: '26px',
                      background: ativo ? '#1f93ff' : '#cbd5e0',
                      borderRadius: '13px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      background: 'white',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '3px',
                      left: ativo ? '27px' : '3px',
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                  </button>
                </div>

                {ativo && (
                  <div>
                    {config.horarios[dia.key].map((periodo, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          marginBottom: '10px',
                          alignItems: 'center'
                        }}
                      >
                        <input
                          type="time"
                          value={periodo.inicio}
                          onChange={(e) => updatePeriodo(dia.key, index, 'inicio', e.target.value)}
                          style={{ ...inputStyle, flex: 1 }}
                        />
                        <span style={{ color: '#718096' }}>até</span>
                        <input
                          type="time"
                          value={periodo.fim}
                          onChange={(e) => updatePeriodo(dia.key, index, 'fim', e.target.value)}
                          style={{ ...inputStyle, flex: 1 }}
                        />
                        <button
                          onClick={() => removerPeriodo(dia.key, index)}
                          style={{
                            padding: '8px',
                            background: '#f56565',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => adicionarPeriodo(dia.key)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        background: '#1f93ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        marginTop: '10px'
                      }}
                    >
                      <Plus size={14} />
                      Adicionar Período
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

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
  fontSize: '14px'
}

export default AbaHorarios
