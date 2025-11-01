import React, { useState } from 'react'
import { Plus, X, AlertTriangle } from 'lucide-react'

function AbaRestricoes({ config, updateConfig, adicionarItem, removerItem }) {
  const [novoNaoAtende, setNovoNaoAtende] = useState('')
  const [novaCondicao, setNovaCondicao] = useState('')

  const handleAdicionarNaoAtende = () => {
    if (novoNaoAtende.trim()) {
      adicionarItem('restricoes.nao_atende', novoNaoAtende.trim())
      setNovoNaoAtende('')
    }
  }

  const handleAdicionarCondicao = () => {
    if (novaCondicao.trim()) {
      adicionarItem('restricoes.condicoes_especiais', novaCondicao.trim())
      setNovaCondicao('')
    }
  }

  return (
    <div>
      {/* Restrições de Idade */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '15px' }}>
          Restrições de Idade
        </h3>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Defina a faixa etária atendida pelo profissional
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          maxWidth: '500px'
        }}>
          <div>
            <label style={labelStyle}>Idade Mínima</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="number"
                value={config.restricoes?.idade_minima || ''}
                onChange={(e) => updateConfig('restricoes.idade_minima', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="Ex: 18"
                style={inputStyle}
                min="0"
                max="120"
              />
              <span style={{ fontSize: '14px', color: '#718096' }}>anos</span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Idade Máxima</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="number"
                value={config.restricoes?.idade_maxima || ''}
                onChange={(e) => updateConfig('restricoes.idade_maxima', e.target.value ? parseInt(e.target.value) : null)}
                placeholder="Ex: 65"
                style={inputStyle}
                min="0"
                max="120"
              />
              <span style={{ fontSize: '14px', color: '#718096' }}>anos</span>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '15px',
          padding: '12px',
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#856404',
          display: 'flex',
          alignItems: 'start',
          gap: '10px'
        }}>
          <AlertTriangle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <strong>Dica:</strong> Deixe em branco se não houver restrição de idade.
            Por exemplo: apenas "Idade Mínima: 18" = atende de 18 anos em diante.
          </div>
        </div>
      </div>

      {/* Condições que NÃO Atende */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '15px' }}>
          Condições/Perfis que NÃO Atende
        </h3>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Perfis de pacientes ou condições que este profissional não atende
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novoNaoAtende}
            onChange={(e) => setNovoNaoAtende(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarNaoAtende()}
            placeholder="Ex: Gestantes, Pacientes pediátricos, Pacientes acamados..."
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarNaoAtende}
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
          {config.restricoes?.nao_atende?.map((restricao, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: '#ffebee',
                color: '#c62828',
                borderRadius: '20px',
                fontSize: '14px'
              }}
            >
              <X size={14} />
              {restricao}
              <button
                onClick={() => removerItem('restricoes.nao_atende', index)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#c62828',
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
      </div>

      {/* Condições Especiais */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '15px' }}>
          Condições Especiais de Atendimento
        </h3>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Requisitos ou condições especiais necessárias para o atendimento
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novaCondicao}
            onChange={(e) => setNovaCondicao(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarCondicao()}
            placeholder="Ex: Jejum de 8h, Trazer exames anteriores, Acompanhante obrigatório..."
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarCondicao}
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
          {config.restricoes?.condicoes_especiais?.map((condicao, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: '#fff3cd',
                color: '#856404',
                borderRadius: '20px',
                fontSize: '14px'
              }}
            >
              <AlertTriangle size={14} />
              {condicao}
              <button
                onClick={() => removerItem('restricoes.condicoes_especiais', index)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#856404',
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
  padding: '10px 12px',
  border: '2px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '14px'
}

export default AbaRestricoes
