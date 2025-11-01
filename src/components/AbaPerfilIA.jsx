import React, { useState } from 'react'
import { Plus, X, Sparkles, GraduationCap, Languages, Star } from 'lucide-react'

function AbaPerfilIA({ config, updateConfig, adicionarItem, removerItem }) {
  const [novaFormacao, setNovaFormacao] = useState('')
  const [novaExpertise, setNovaExpertise] = useState('')
  const [novoIdioma, setNovoIdioma] = useState('')
  const [novoDiferencial, setNovoDiferencial] = useState('')
  const [novoIndicadoPara, setNovoIndicadoPara] = useState('')

  const perfil = config.perfil_ia || {}

  const handleAdicionarFormacao = () => {
    if (novaFormacao.trim()) {
      adicionarItem('perfil_ia.formacao', novaFormacao.trim())
      setNovaFormacao('')
    }
  }

  const handleAdicionarExpertise = () => {
    if (novaExpertise.trim()) {
      adicionarItem('perfil_ia.areas_expertise', novaExpertise.trim())
      setNovaExpertise('')
    }
  }

  const handleAdicionarIdioma = () => {
    if (novoIdioma.trim()) {
      adicionarItem('perfil_ia.idiomas', novoIdioma.trim())
      setNovoIdioma('')
    }
  }

  const handleAdicionarDiferencial = () => {
    if (novoDiferencial.trim()) {
      adicionarItem('perfil_ia.diferenciais', novoDiferencial.trim())
      setNovoDiferencial('')
    }
  }

  const handleAdicionarIndicadoPara = () => {
    if (novoIndicadoPara.trim()) {
      adicionarItem('perfil_ia.indicado_para', novoIndicadoPara.trim())
      setNovoIndicadoPara('')
    }
  }

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
        <Sparkles size={20} color="#1f93ff" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <strong style={{ color: '#1f93ff' }}>Perfil para IA</strong>
          <p style={{ fontSize: '13px', color: '#4a5568', marginTop: '5px' }}>
            Essas informações serão usadas pela IA do Chatwoot para fazer recomendações 
            inteligentes de profissionais aos pacientes baseado nas necessidades deles.
          </p>
        </div>
      </div>

      {/* Biografia */}
      <div style={{ marginBottom: '30px' }}>
        <label style={labelStyle}>Biografia / Apresentação</label>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '10px' }}>
          Breve descrição profissional (será usada para apresentar o médico aos pacientes)
        </p>
        <textarea
          value={perfil.bio || ''}
          onChange={(e) => updateConfig('perfil_ia.bio', e.target.value)}
          placeholder="Ex: Especialista em gastroenterologia com 15 anos de experiência. Focado em endoscopia digestiva e tratamento de doenças inflamatórias intestinais..."
          style={{
            ...inputStyle,
            minHeight: '120px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
      </div>

      {/* Formação */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px'
        }}>
          <GraduationCap size={18} color="#1f93ff" />
          <label style={labelStyle}>Formação Acadêmica</label>
        </div>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Graduações, especializações, títulos e certificações
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novaFormacao}
            onChange={(e) => setNovaFormacao(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarFormacao()}
            placeholder="Ex: Residência em Gastroenterologia - UNIFESP"
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarFormacao}
            style={buttonStyle}
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {perfil.formacao?.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}
            >
              <span style={{ fontSize: '14px', color: '#2d3748' }}>{item}</span>
              <button
                onClick={() => removerItem('perfil_ia.formacao', index)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#dc3545',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Áreas de Expertise */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px'
        }}>
          <Star size={18} color="#1f93ff" />
          <label style={labelStyle}>Áreas de Expertise</label>
        </div>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Áreas específicas de destaque e especialização
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novaExpertise}
            onChange={(e) => setNovaExpertise(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarExpertise()}
            placeholder="Ex: Doença de Crohn, Retocolite Ulcerativa"
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarExpertise}
            style={buttonStyle}
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {perfil.areas_expertise?.map((area, index) => (
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
              <Star size={14} />
              {area}
              <button
                onClick={() => removerItem('perfil_ia.areas_expertise', index)}
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

      {/* Idiomas */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px'
        }}>
          <Languages size={18} color="#1f93ff" />
          <label style={labelStyle}>Idiomas</label>
        </div>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Idiomas em que o profissional pode atender
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novoIdioma}
            onChange={(e) => setNovoIdioma(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarIdioma()}
            placeholder="Ex: Inglês (fluente), Espanhol (intermediário)"
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarIdioma}
            style={buttonStyle}
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {perfil.idiomas?.map((idioma, index) => (
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
              <Languages size={14} />
              {idioma}
              <button
                onClick={() => removerItem('perfil_ia.idiomas', index)}
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

      {/* Diferenciais */}
      <div style={{ marginBottom: '30px' }}>
        <label style={labelStyle}>Diferenciais</label>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Características únicas que destacam este profissional
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novoDiferencial}
            onChange={(e) => setNovoDiferencial(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarDiferencial()}
            placeholder="Ex: Atendimento humanizado, Expertise em casos complexos"
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarDiferencial}
            style={buttonStyle}
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {perfil.diferenciais?.map((dif, index) => (
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
              <Sparkles size={14} />
              {dif}
              <button
                onClick={() => removerItem('perfil_ia.diferenciais', index)}
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

      {/* Indicado Para */}
      <div>
        <label style={labelStyle}>Indicado Para</label>
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '15px' }}>
          Perfis de pacientes para os quais este profissional é mais indicado
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={novoIndicadoPara}
            onChange={(e) => setNovoIndicadoPara(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarIndicadoPara()}
            placeholder="Ex: Pacientes com DII, Casos de urgência endoscópica"
            style={inputStyle}
          />
          <button
            onClick={handleAdicionarIndicadoPara}
            style={buttonStyle}
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {perfil.indicado_para?.map((indicacao, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                background: '#f3e5f5',
                color: '#7b1fa2',
                borderRadius: '20px',
                fontSize: '14px'
              }}
            >
              {indicacao}
              <button
                onClick={() => removerItem('perfil_ia.indicado_para', index)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#7b1fa2',
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
  fontSize: '15px',
  fontWeight: '600',
  color: '#2d3748',
  marginBottom: '5px'
}

const inputStyle = {
  flex: 1,
  padding: '10px 12px',
  border: '2px solid #e2e8f0',
  borderRadius: '6px',
  fontSize: '14px'
}

const buttonStyle = {
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
}

export default AbaPerfilIA
