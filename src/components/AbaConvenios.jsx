import React, { useState } from 'react'
import { Plus, X, DollarSign, Building2, Globe } from 'lucide-react'

function AbaConvenios({ config, updateConfig, adicionarItem, removerItem }) {
  const [novoConvenio, setNovoConvenio] = useState('')

  const handleAdicionarConvenio = () => {
    if (novoConvenio.trim()) {
      adicionarItem('formas_atendimento.convenios_atendidos', novoConvenio.trim())
      setNovoConvenio('')
    }
  }

  const formas = config.formas_atendimento || {}

  return (
    <div>
      {/* Atendimento Particular */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <DollarSign size={20} color="#1f93ff" />
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            Atendimento Particular
          </h3>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#4a5568'
          }}>
            <input
              type="checkbox"
              checked={formas.aceita_particular}
              onChange={(e) => updateConfig('formas_atendimento.aceita_particular', e.target.checked)}
              style={{ width: 'auto', cursor: 'pointer' }}
            />
            Aceita atendimento particular
          </label>
        </div>

        {formas.aceita_particular && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            maxWidth: '600px'
          }}>
            <div>
              <label style={labelStyle}>Valor Consulta Padrão</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#718096',
                  fontSize: '14px'
                }}>
                  R$
                </span>
                <input
                  type="number"
                  value={formas.valor_consulta_particular || ''}
                  onChange={(e) => updateConfig('formas_atendimento.valor_consulta_particular', parseFloat(e.target.value))}
                  placeholder="0,00"
                  style={{ ...inputStyle, paddingLeft: '35px' }}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Valor Primeira Consulta</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#718096',
                  fontSize: '14px'
                }}>
                  R$
                </span>
                <input
                  type="number"
                  value={formas.valor_primeira_consulta || ''}
                  onChange={(e) => updateConfig('formas_atendimento.valor_primeira_consulta', parseFloat(e.target.value))}
                  placeholder="0,00"
                  style={{ ...inputStyle, paddingLeft: '35px' }}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Convênios */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <Building2 size={20} color="#1f93ff" />
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            Convênios
          </h3>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#4a5568'
          }}>
            <input
              type="checkbox"
              checked={formas.aceita_convenios}
              onChange={(e) => updateConfig('formas_atendimento.aceita_convenios', e.target.checked)}
              style={{ width: 'auto', cursor: 'pointer' }}
            />
            Aceita convênios médicos
          </label>
        </div>

        {formas.aceita_convenios && (
          <>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input
                type="text"
                value={novoConvenio}
                onChange={(e) => setNovoConvenio(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdicionarConvenio()}
                placeholder="Ex: Unimed, Bradesco Saúde, Amil..."
                style={inputStyle}
              />
              <button
                onClick={handleAdicionarConvenio}
                style={{
                  padding: '10px 20px',
                  background: '#1f93ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Plus size={16} />
                Adicionar
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {formas.convenios_atendidos?.map((convenio, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    background: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                >
                  <Building2 size={14} />
                  {convenio}
                  <button
                    onClick={() => removerItem('formas_atendimento.convenios_atendidos', index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#1976d2',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {(!formas.convenios_atendidos || formas.convenios_atendidos.length === 0) && (
              <div style={{
                padding: '20px',
                background: '#f8f9fa',
                border: '2px dashed #dee2e6',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#6c757d',
                fontSize: '14px'
              }}>
                Nenhum convênio cadastrado. Adicione os convênios aceitos pelo profissional.
              </div>
            )}
          </>
        )}
      </div>

      {/* Telemedicina */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <Globe size={20} color="#1f93ff" />
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            Telemedicina
          </h3>
        </div>

        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#4a5568'
        }}>
          <input
            type="checkbox"
            checked={formas.aceita_online}
            onChange={(e) => updateConfig('formas_atendimento.aceita_online', e.target.checked)}
            style={{ width: 'auto', cursor: 'pointer' }}
          />
          Realiza atendimentos online (telemedicina)
        </label>

        {formas.aceita_online && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            background: '#e8f5e9',
            border: '1px solid #4caf50',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#2e7d32'
          }}>
            <strong>✓ Telemedicina ativa:</strong> Este profissional poderá receber agendamentos para consultas online.
          </div>
        )}
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
  flex: 1,
  width: '100%',
  padding: '10px 12px',
  border: '2px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '14px'
}

export default AbaConvenios
