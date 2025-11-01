-- ===================================
-- SCRIPT SQL - SoftClin Agenda v2.0
-- ===================================
-- Execute este script no SQL Editor do Supabase
-- para criar todas as tabelas necessárias

-- 1. Tabela de Profissionais
CREATE TABLE IF NOT EXISTS profissionais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo TEXT NOT NULL,
  nome_exibicao TEXT NOT NULL UNIQUE,
  especialidade TEXT NOT NULL,
  crm_registro TEXT,
  email TEXT,
  telefone TEXT,
  ativo BOOLEAN DEFAULT true,
  config_atendimento JSONB DEFAULT '{
    "horarios": {},
    "duracao_consulta": 30,
    "primeira_consulta_duracao": 60,
    "retorno_duracao": 30,
    "intervalo_entre_consultas": 10,
    "max_consultas_dia": 12,
    "aceita_encaixe": true,
    "almoco": {"inicio": "", "fim": ""},
    "especialidades": [],
    "procedimentos_que_realiza": [],
    "procedimentos_que_nao_realiza": [],
    "restricoes": {
      "idade_minima": null,
      "idade_maxima": null,
      "nao_atende": [],
      "condicoes_especiais": []
    },
    "formas_atendimento": {
      "aceita_particular": true,
      "valor_consulta_particular": 0,
      "valor_primeira_consulta": 0,
      "aceita_convenios": true,
      "convenios_atendidos": [],
      "aceita_online": false
    },
    "perfil_ia": {
      "bio": "",
      "formacao": [],
      "areas_expertise": [],
      "idiomas": [],
      "diferenciais": [],
      "indicado_para": []
    },
    "comunicacao": {
      "aceita_contato_whatsapp": true,
      "tempo_resposta_medio": "",
      "disponivel_urgencias": false,
      "plantao_fim_semana": false
    }
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paciente TEXT NOT NULL,
  profissional TEXT NOT NULL,
  data_consulta DATE NOT NULL,
  hora_consulta TIME NOT NULL,
  tipo_consulta TEXT DEFAULT 'Consulta',
  primeira_consulta BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_profissionais_ativo ON profissionais(ativo);
CREATE INDEX IF NOT EXISTS idx_profissionais_nome ON profissionais(nome_exibicao);
CREATE INDEX IF NOT EXISTS idx_agendamentos_data ON agendamentos(data_consulta);
CREATE INDEX IF NOT EXISTS idx_agendamentos_profissional ON agendamentos(profissional);
CREATE INDEX IF NOT EXISTS idx_agendamentos_status ON agendamentos(status);

-- 4. Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profissionais_updated_at
    BEFORE UPDATE ON profissionais
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agendamentos_updated_at
    BEFORE UPDATE ON agendamentos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. RLS (Row Level Security) - Políticas de acesso
-- ATENÇÃO: Ajuste conforme suas necessidades de segurança!

-- Habilitar RLS
ALTER TABLE profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;

-- Política para profissionais (permitir tudo para autenticados)
CREATE POLICY "Enable all for authenticated users" ON profissionais
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para profissionais (permitir leitura para anônimos)
CREATE POLICY "Enable read for anon" ON profissionais
  FOR SELECT
  TO anon
  USING (ativo = true);

-- Política para agendamentos (permitir tudo para autenticados)
CREATE POLICY "Enable all for authenticated users" ON agendamentos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para agendamentos (permitir leitura para anônimos)
CREATE POLICY "Enable read for anon" ON agendamentos
  FOR SELECT
  TO anon
  USING (true);

-- 6. Dados de exemplo (OPCIONAL - remova se não quiser)
INSERT INTO profissionais (nome_completo, nome_exibicao, especialidade, crm_registro, email, config_atendimento)
VALUES (
  'Dr. João da Silva',
  'Dr. João Silva',
  'Gastroenterologia',
  'CRM/SP 123456',
  'joao.silva@clinica.com',
  '{
    "horarios": {
      "segunda": [{"inicio": "08:00", "fim": "12:00"}, {"inicio": "14:00", "fim": "18:00"}],
      "terca": [{"inicio": "08:00", "fim": "12:00"}, {"inicio": "14:00", "fim": "18:00"}],
      "quarta": [{"inicio": "08:00", "fim": "12:00"}, {"inicio": "14:00", "fim": "18:00"}],
      "quinta": [{"inicio": "08:00", "fim": "12:00"}, {"inicio": "14:00", "fim": "18:00"}],
      "sexta": [{"inicio": "08:00", "fim": "12:00"}]
    },
    "duracao_consulta": 30,
    "primeira_consulta_duracao": 60,
    "retorno_duracao": 30,
    "intervalo_entre_consultas": 10,
    "max_consultas_dia": 12,
    "aceita_encaixe": true,
    "almoco": {"inicio": "12:00", "fim": "14:00"},
    "especialidades": ["Gastroenterologia", "Endoscopia Digestiva"],
    "procedimentos_que_realiza": ["EDA", "Colonoscopia", "Retossigmoidoscopia"],
    "restricoes": {
      "idade_minima": 18,
      "nao_atende": ["Gestantes"],
      "condicoes_especiais": ["Jejum de 8h para procedimentos"]
    },
    "formas_atendimento": {
      "aceita_particular": true,
      "valor_consulta_particular": 300,
      "valor_primeira_consulta": 400,
      "aceita_convenios": true,
      "convenios_atendidos": ["Unimed", "Bradesco Saúde", "Amil"],
      "aceita_online": true
    },
    "perfil_ia": {
      "bio": "Especialista em gastroenterologia com 15 anos de experiência. Focado em endoscopia digestiva e tratamento de doenças inflamatórias intestinais.",
      "formacao": ["Residência em Gastroenterologia - UNIFESP", "Fellowship em Endoscopia - USP"],
      "areas_expertise": ["Doença de Crohn", "Retocolite Ulcerativa", "Refluxo"],
      "idiomas": ["Português", "Inglês (fluente)", "Espanhol (intermediário)"],
      "diferenciais": ["Atendimento humanizado", "Expertise em casos complexos"],
      "indicado_para": ["Pacientes com DII", "Casos de urgência endoscópica"]
    },
    "comunicacao": {
      "aceita_contato_whatsapp": true,
      "tempo_resposta_medio": "rapido",
      "disponivel_urgencias": true,
      "plantao_fim_semana": false
    }
  }'::jsonb
) ON CONFLICT (nome_exibicao) DO NOTHING;

-- ===================================
-- FIM DO SCRIPT
-- ===================================
-- Tabelas criadas com sucesso!
-- Agora você pode usar o sistema normalmente.
