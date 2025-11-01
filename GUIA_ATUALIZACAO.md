# 🔄 GUIA DE ATUALIZAÇÃO - v2.0

## 🎉 O que foi atualizado:

### ✅ Duração Dinâmica dos Agendamentos
- Agora busca as configurações de cada profissional do banco
- Aplica duração correta baseado em `primeira_consulta`
- Usa `duracao_consulta` ou `primeira_consulta_duracao` conforme o caso

### ✅ Indicador Visual
- Mostra "📋 Primeira consulta" nos eventos
- Exibe a duração em minutos no tooltip

### ✅ Cores Ajustadas para o Tema Chatwoot
- Azul: #1f93ff (cor principal do Chatwoot)
- Verde: #44ce4b (confirmado)
- Amarelo: #ffc532 (pendente)
- Vermelho: #f44336 (cancelado)

### ✅ Sistema Completo de Gestão de Profissionais
- 6 abas especializadas (Horários, Competências, Restrições, Convênios, Perfil IA, Comunicação)
- Interface moderna e intuitiva
- Todas as configurações necessárias para IA do Chatwoot

---

## 📦 Como Atualizar Seu Projeto

### **Opção 1: Projeto Novo (Recomendado)**

Se você ainda não tem o projeto no ar ou quer começar do zero:

1. **Extraia o arquivo `softclin-agenda-atualizado.zip`**

2. **Entre na pasta**
```bash
cd softclin-agenda-atualizado
```

3. **Instale as dependências**
```bash
npm install
```

4. **Configure o .env**
```bash
cp .env.example .env
```
Edite o `.env` e adicione suas credenciais do Supabase

5. **Teste localmente**
```bash
npm run dev
```

6. **Faça push para o GitHub**
```bash
git init
git add .
git commit -m "v2.0 - Gestão completa de profissionais"
git branch -M main
git remote add origin https://github.com/seu-usuario/softclin-agenda.git
git push -u origin main
```

---

### **Opção 2: Atualizar Projeto Existente**

Se você já tem o projeto rodando:

1. **Backup do atual**
```bash
git commit -am "Backup antes da atualização v2.0"
```

2. **Substitua os arquivos**
   - `src/App.jsx` → Novo App.jsx com durações dinâmicas
   - `src/GestaoProfissionais.jsx` → Gestão completa
   - `src/components/` → Todos os novos componentes de abas

3. **Commit e Push**
```bash
git add .
git commit -m "Atualização v2.0 - Gestão completa"
git push
```

---

## 🚀 Deploy no Coolify

### Após fazer push para o GitHub:

1. **Entre no Coolify**

2. **Vá no seu resource da agenda**

3. **Clique em "Redeploy"** ou **"Restart"**

4. **Aguarde o build** (2-3 minutos)

5. **Teste acessando**: `https://seu-dominio.com/`

---

## ✅ Testando a Atualização

Após o deploy, verifique:

- [ ] Os agendamentos aparecem com a duração correta
- [ ] Primeiras consultas mostram duração maior
- [ ] O tooltip mostra "📋 Primeira consulta"
- [ ] Os eventos de retorno têm duração padrão
- [ ] As cores estão no padrão Chatwoot (#1f93ff)
- [ ] A gestão de profissionais está funcionando
- [ ] Todas as 6 abas aparecem corretamente

---

## 📊 Estrutura Esperada no Banco

### Tabela `profissionais`:
```json
{
  "nome_exibicao": "Dr. João Silva",
  "config_atendimento": {
    "duracao_consulta": 30,
    "primeira_consulta_duracao": 60,
    "retorno_duracao": 30,
    "intervalo_entre_consultas": 10,
    "horarios": {
      "segunda": [{"inicio": "08:00", "fim": "18:00"}],
      "terca": [{"inicio": "08:00", "fim": "18:00"}]
    },
    "especialidades": ["Gastroenterologia"],
    "procedimentos_que_realiza": ["EDA", "Colonoscopia"],
    "restricoes": {
      "idade_minima": 18,
      "nao_atende": ["Gestantes"]
    },
    "formas_atendimento": {
      "aceita_particular": true,
      "valor_consulta_particular": 300,
      "aceita_convenios": true,
      "convenios_atendidos": ["Unimed", "Bradesco"]
    },
    "perfil_ia": {
      "bio": "Especialista em gastroenterologia...",
      "formacao": ["Residência UNIFESP"],
      "areas_expertise": ["Doença de Crohn"],
      "idiomas": ["Português", "Inglês"]
    },
    "comunicacao": {
      "aceita_contato_whatsapp": true,
      "tempo_resposta_medio": "rapido",
      "disponivel_urgencias": false
    }
  }
}
```

### Tabela `agendamentos`:
```json
{
  "paciente": "Maria Silva",
  "profissional": "Dr. João Silva",
  "data_consulta": "2025-10-30",
  "hora_consulta": "09:00",
  "primeira_consulta": true,
  "status": "confirmado"
}
```

---

## 🐛 Troubleshooting

### **"Todos os agendamentos têm 30 minutos"**
→ Verifique se o campo `config_atendimento` está preenchido na tabela `profissionais`

### **"Duração errada para primeiras consultas"**
→ Verifique se o campo `primeira_consulta` está como `true` na tabela `agendamentos`

### **"Nome do profissional não corresponde"**
→ O campo `profissional` em `agendamentos` deve ser EXATAMENTE igual ao `nome_exibicao` em `profissionais`

### **"Componentes de aba não aparecem"**
→ Verifique se todos os arquivos em `src/components/` foram criados corretamente

### **"Erro ao salvar profissional"**
→ Verifique as permissões da tabela `profissionais` no Supabase (RLS policies)

---

## 📞 Suporte

Encontrou algum problema? 
- Verifique os logs do Coolify
- Teste localmente com `npm run dev`
- Verifique o console do navegador (F12)

---

💡 **Dica**: Use a gestão de profissionais para configurar todos os médicos antes de começar a usar a IA do Chatwoot!

---

**Boa sorte com a atualização! 🚀**
