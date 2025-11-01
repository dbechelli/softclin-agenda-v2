# 🚀 INÍCIO RÁPIDO

## Configuração em 5 Passos

### 1️⃣ Configure o Supabase
```bash
# Acesse https://supabase.com e crie um projeto
# Copie: Project URL e anon public key
# Execute o script: supabase-setup.sql no SQL Editor
```

### 2️⃣ Configure as Variáveis de Ambiente
```bash
cp .env.example .env
# Edite o .env e adicione suas credenciais
```

### 3️⃣ Instale as Dependências
```bash
npm install
```

### 4️⃣ Rode Localmente (Teste)
```bash
npm run dev
# Acesse: http://localhost:5173
```

### 5️⃣ Deploy no Coolify
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/softclin-agenda.git
git push -u origin main

# No Coolify:
# - New Resource → Git Repository
# - Selecione o repo
# - Adicione as variáveis de ambiente
# - Deploy!
```

## ✅ Checklist Pós-Deploy

- [ ] Acessar a URL do deploy
- [ ] Ver se o calendário aparece
- [ ] Ir em "Profissionais"
- [ ] Criar um profissional de teste
- [ ] Preencher todas as 6 abas
- [ ] Salvar
- [ ] Voltar ao calendário
- [ ] Verificar se funciona!

## 📞 Precisa de Ajuda?

1. Leia o `README.md` completo
2. Veja o `GUIA_ATUALIZACAO.md`
3. Confira o troubleshooting

---

**Boa sorte! 🎉**
