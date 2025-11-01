import React, { useState } from 'react'
import { Plus, Trash2, Check, X } from 'lucide-react'

function AbaCompetencias({ config, adicionarItem, removerItem }) {
  const [novaEspecialidade, setNovaEspecialidade] = useState('')
  const [novoProcedimento, setNovoProcedimento] = useState('')
  const [novoNaoRealiza, setNovoNaoRealiza] = useState('')

  const handleAdicionarEspecialidade = () => {
    if (novaEspecialidade.trim()) {
      adicionarItem('especialidades', novaEspecialidade.trim())
      setNovaEspecialidade('')
    }
  }

  const handleAdicionarProcedimento = () => {
    if (novoProcedimento.trim()) {
      adicionarItem('procedimentos_que_realiza', novoProcedimento.trim())
      setNovoProcedimento('')
    }
  }

  const handleAdicionarNaoRealiza = () => {
    if (novoNaoRealiza.trim()) {
      adicionarItem('procedimentos_que_nao_realiza', novoNaoRealiza.trim())
      setNovoNaoRealiza('')
    }
  }

  return (
    <div>
      {/* Especialidades */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '15px' }}>
          Especialidades
        </h3>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Áreas médicas em que o profissional atua
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novaEspecialidade}
            onChange={(e) => setNovaEspecialidade(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarEspecialidade()}
            placeholder="Ex: Endoscopia Digestiva, Colonoscopia..."
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarEspecialidade}
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
          {config.especialidades?.map((esp, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: '#e8f5e9',
                color: '#2e7d32',
                borderRadius: '20px',
                fontSize: '14px'
              }}
            >
              <Check size={14} />
              {esp}
              <button
                onClick={() => removerItem('especialidades', index)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#2e7d32',
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

      {/* Procedimentos que Realiza */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '15px' }}>
          Procedimentos que Realiza
        </h3>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Lista de exames e procedimentos que este profissional está habilitado a realizar
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novoProcedimento}
            onChange={(e) => setNovoProcedimento(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarProcedimento()}
            placeholder="Ex: EDA com Biópsia, Colonoscopia Terapêutica..."
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarProcedimento}
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
          {config.procedimentos_que_realiza?.map((proc, index) => (
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
              <Check size={14} />
              {proc}
              <button
                onClick={() => removerItem('procedimentos_que_realiza', index)}
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
      </div>

      {/* Procedimentos que NÃO Realiza */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '15px' }}>
          Procedimentos que NÃO Realiza
        </h3>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Procedimentos que este profissional não realiza (importante para triagem adequada)
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novoNaoRealiza}
            onChange={(e) => setNovoNaoRealiza(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarNaoRealiza()}
            placeholder="Ex: Cirurgias, Procedimentos Pediátricos..."
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarNaoRealiza}
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
          {config.procedimentos_que_nao_realiza?.map((proc, index) => (
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
              {proc}
              <button
                onClick={() => removerItem('procedimentos_que_nao_realiza', index)}
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
    </div>
  )
}

const inputStyle = {
  flex: 1,
  padding: '10px 12px',
  border: '2px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '14px'
}

export default AbaCompetencias
