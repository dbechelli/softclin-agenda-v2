import React from 'react'
import { MessageCircle, Clock, AlertOctagon, Calendar } from 'lucide-react'

function AbaComunicacao({ config, updateConfig }) {
  const comunicacao = config.comunicacao || {}

  return (
    <div>
      <div style={{
        padding: '15px',
        background: '#f0f4ff',
        border: '2px solid #1f93ff',
        borderRadius: '8px',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'start',
        gap: '12px'
      }}>
        <MessageCircle size={20} color="#1f93ff" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <strong style={{ color: '#1f93ff' }}>Preferências de Comunicação</strong>
          <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '5px' }}>
            Configure como e quando este profissional pode ser contatado pelos pacientes e pela equipe.
          </p>
        </div>
      </div>

      {/* WhatsApp */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <MessageCircle size={20} color="#25D366" />
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            WhatsApp
          </h3>
        </div>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#4a5568',
          marginBottom: '10px'
        }}>
          <input
            type="checkbox"
            checked={comunicacao.aceita_contato_whatsapp}
            onChange={(e) => updateConfig('comunicacao.aceita_contato_whatsapp', e.target.checked)}
            style={{ width: 'auto', cursor: 'pointer' }}
          />
          Aceita contato via WhatsApp
        </label>

        {comunicacao.aceita_contato_whatsapp && (
          <div style={{
            marginTop: '10px',
            padding: '12px',
            background: '#e8f5e9',
            border: '1px solid #4caf50',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#2e7d32'
          }}>
            <strong>✓ WhatsApp ativo:</strong> Pacientes poderão enviar mensagens pelo WhatsApp vinculado ao cadastro.
          </div>
        )}
      </div>

      {/* Tempo de Resposta */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <Clock size={20} color="#1f93ff" />
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            Tempo de Resposta
          </h3>
        </div>

        <div style={{ maxWidth: '400px' }}>
          <label style={labelStyle}>Tempo médio de resposta</label>
          <select
            value={comunicacao.tempo_resposta_medio || ''}
            onChange={(e) => updateConfig('comunicacao.tempo_resposta_medio', e.target.value)}
            style={selectStyle}
          >
            <option value="">Selecione...</option>
            <option value="imediato">Imediato (até 1 hora)</option>
            <option value="rapido">Rápido (até 4 horas)</option>
            <option value="mesmo_dia">Mesmo dia (até 12 horas)</option>
            <option value="proximo_dia">Próximo dia útil (até 24h)</option>
            <option value="2_dias">Até 2 dias úteis</option>
            <option value="nao_disponivel">Não disponível para mensagens</option>
          </select>
          <p style={{
            fontSize: '12px',
            color: '#718096',
            marginTop: '8px'
          }}>
            Tempo aproximado que o profissional leva para responder mensagens de pacientes
          </p>
        </div>
      </div>

      {/* Disponibilidade para Urgências */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <AlertOctagon size={20} color="#f44336" />
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            Urgências
          </h3>
        </div>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#4a5568',
          marginBottom: '10px'
        }}>
          <input
            type="checkbox"
            checked={comunicacao.disponivel_urgencias}
            onChange={(e) => updateConfig('comunicacao.disponivel_urgencias', e.target.checked)}
            style={{ width: 'auto', cursor: 'pointer' }}
          />
          Disponível para atendimento de urgências
        </label>

        {comunicacao.disponivel_urgencias && (
          <div style={{
            marginTop: '10px',
            padding: '12px',
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#856404'
          }}>
            <strong>⚠️ Atenção:</strong> Este profissional poderá ser contactado para casos de urgência fora do horário comercial.
          </div>
        )}
      </div>

      {/* Plantão Fim de Semana */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <Calendar size={20} color="#1f93ff" />
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            Fim de Semana
          </h3>
        </div>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#4a5568',
          marginBottom: '10px'
        }}>
          <input
            type="checkbox"
            checked={comunicacao.plantao_fim_semana}
            onChange={(e) => updateConfig('comunicacao.plantao_fim_semana', e.target.checked)}
            style={{ width: 'auto', cursor: 'pointer' }}
          />
          Faz plantão aos finais de semana
        </label>

        {comunicacao.plantao_fim_semana && (
          <div style={{
            marginTop: '10px',
            padding: '12px',
            background: '#e3f2fd',
            border: '1px solid #2196f3',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#1565c0'
          }}>
            <strong>ℹ️ Plantão:</strong> Este profissional está disponível para atendimentos aos sábados e domingos.
          </div>
        )}
      </div>

      {/* Resumo */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '12px',
        border: '2px solid #e9ecef'
      }}>
        <h4 style={{
          fontSize: '15px',
          fontWeight: '600',
          color: '#2d3748',
          marginBottom: '15px'
        }}>
          📋 Resumo das Configurações
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>WhatsApp:</span>
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              color: comunicacao.aceita_contato_whatsapp ? '#2e7d32' : '#c62828'
            }}>
              {comunicacao.aceita_contato_whatsapp ? '✓ Ativo' : '✗ Inativo'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>Tempo de Resposta:</span>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>
              {comunicacao.tempo_resposta_medio 
                ? comunicacao.tempo_resposta_medio.replace('_', ' ') 
                : 'Não definido'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>Urgências:</span>
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              color: comunicacao.disponivel_urgencias ? '#2e7d32' : '#c62828'
            }}>
              {comunicacao.disponivel_urgencias ? '✓ Disponível' : '✗ Não disponível'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>Plantão Fim de Semana:</span>
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              color: comunicacao.plantao_fim_semana ? '#2e7d32' : '#c62828'
            }}>
              {comunicacao.plantao_fim_semana ? '✓ Sim' : '✗ Não'}
            </span>
          </div>
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

const selectStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '2px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '14px',
  background: 'white',
  cursor: 'pointer'
}

export default AbaComunicacao
