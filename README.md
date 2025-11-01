# 📅 SoftClin Agenda v2.0

Sistema inteligente de agendamento médico com gestão completa de profissionais, integrado ao Chatwoot.

## ✨ Novidades da v2.0

### 🔄 Duração Dinâmica de Consultas
- **Duração automática** baseada nas configurações de cada profissional
- **Primeira consulta** com tempo diferenciado
- **Retornos** com duração personalizada
- **Indicador visual** "📋 Primeira consulta" nos eventos
- **Tooltip** mostrando duração em minutos

### 👨‍⚕️ Gestão Completa de Profissionais
Sistema com 6 abas especializadas:

1. **⏰ Horários**
   - Configuração de dias e períodos de atendimento
   - Duração de consultas (padrão, primeira consulta, retorno)
   - Intervalo entre consultas
   - Horário de almoço
   - Limite de consultas por dia
   - Aceita encaixe

2. **🩺 Competências**
   - Especialidades
   - Procedimentos que realiza
   - Procedimentos que NÃO realiza

3. **🚫 Restrições**
   - Idade mínima/máxima
   - Perfis que não atende
   - Condições especiais de atendimento

4. **💳 Convênios**
   - Atendimento particular (com valores)
   - Convênios aceitos
   - Telemedicina

5. **🤖 Perfil IA**
   - Biografia profissional
   - Formação acadêmica
   - Áreas de expertise
   - Idiomas
   - Diferenciais
   - Indicações (perfis de pacientes ideais)

6. **📱 Comunicação**
   - WhatsApp
   - Tempo de resposta médio
   - Disponibilidade para urgências
   - Plantão fim de semana

### 🎨 Design Atualizado
- Cores do tema Chatwoot (#1f93ff)
- Interface moderna e intuitiva
- Componentes reutilizáveis
- Responsivo

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/softclin-agenda.git
cd softclin-agenda
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do Supabase:
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_KEY=sua-anon-key-aqui
```

### 4. Execute o projeto
```bash
npm run dev
```

Acesse: `http://localhost:5173`

## 📦 Estrutura de Banco de Dados

### Tabela: `profissionais`
```sql
CREATE TABLE profissionais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_completo TEXT NOT NULL,
  nome_exibicao TEXT NOT NULL,
  especialidade TEXT NOT NULL,
  crm_registro TEXT,
  email TEXT,
  telefone TEXT,
  ativo BOOLEAN DEFAULT true,
  config_atendimento JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: `agendamentos`
```sql
CREATE TABLE agendamentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  paciente TEXT NOT NULL,
  profissional TEXT NOT NULL,
  data_consulta DATE NOT NULL,
  hora_consulta TIME NOT NULL,
  tipo_consulta TEXT,
  primeira_consulta BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pendente',
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Como Funciona a Duração Dinâmica

O sistema busca as configurações de cada profissional e aplica:

```javascript
const duracao = agendamento.primeira_consulta 
  ? config.primeira_consulta_duracao  // Ex: 60 min
  : config.duracao_consulta            // Ex: 30 min
```

**Exemplo:**
- Primeira consulta do Dr. João: **60 minutos**
- Retorno do Dr. João: **30 minutos**
- Primeira consulta da Dra. Maria: **45 minutos** (configuração diferente)

## 🎨 Cores do Tema Chatwoot

- **Azul Principal**: `#1f93ff`
- **Verde (Confirmado)**: `#44ce4b`
- **Amarelo (Pendente)**: `#ffc532`
- **Vermelho (Cancelado)**: `#f44336`

## 📱 Deploy

### Coolify (Recomendado)

1. **Faça push para o GitHub**
```bash
git add .
git commit -m "Deploy v2.0"
git push
```

2. **No Coolify:**
   - New Resource → Git Repository
   - Selecione seu repo
   - Branch: `main`
   - Build Pack: `Dockerfile`
   - Adicione as variáveis de ambiente

3. **Deploy!**
   - Clique em "Deploy"
   - Aguarde o build
   - Acesse o domínio configurado

## 🐛 Troubleshooting

### Durações não aparecem corretas?
✅ Verifique se o campo `config_atendimento` está preenchido na tabela `profissionais`

### Primeira consulta com duração errada?
✅ Verifique se o campo `primeira_consulta` está como `true` na tabela `agendamentos`

### Nome do profissional não corresponde?
✅ O campo `profissional` em `agendamentos` deve ser EXATAMENTE igual ao `nome_exibicao` em `profissionais`

## 📚 Tecnologias

- **React 18** + **Vite**
- **FullCalendar** para o calendário
- **Supabase** para banco de dados
- **Lucide React** para ícones

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

MIT © 2025 SoftClin

---

**Desenvolvido com ❤️ para otimizar o atendimento médico**
