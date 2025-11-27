# 📦 Guia de Reorganização do Projeto

Este projeto está sendo convertido de um monolito para um **monorepo** com frontend e backend separados.

## 📋 Estrutura Anterior

```
softclin-agenda-v2.0/
├── src/                    # Frontend (React)
├── backend/                # Backend (Express)
├── package.json           # (Raiz)
├── vite.config.js         # (Raiz)
└── ... (misturado)
```

## 🎯 Estrutura Nova (Objetivo)

```
softclin-agenda-v2.0/
├── frontend/              # React + Vite
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/               # Express + PostgreSQL
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── docs/                  # Documentação
```

## 📝 Passo a Passo

### Opção 1: Reorganização Manual (Recomendado)

1. **Crie a pasta `frontend/`**
   ```bash
   mkdir frontend
   ```

2. **Mova os arquivos do React para `frontend/`**
   ```bash
   # Windows PowerShell
   Move-Item src frontend/
   Move-Item package.json frontend/
   Move-Item package-lock.json frontend/
   Move-Item vite.config.js frontend/
   Move-Item index.html frontend/
   Move-Item .env frontend/ (se tiver)
   Move-Item .env.example frontend/
   ```

3. **Atualize `.env` do frontend**
   ```
   VITE_API_URL=http://localhost:3001/api
   VITE_API_KEY=sua_chave_api
   ```

4. **Deixe na raiz apenas:**
   - `.git/`
   - `backend/`
   - `frontend/`
   - `docs/` (arquivos de documentação)
   - `README.md` (documentação principal)

### Opção 2: Usando Script (Se preferir)

```powershell
# Script para reorganizar automaticamente
$frontend = "frontend"
$backend = "backend"

# Criar pasta frontend
mkdir $frontend -Force

# Mover arquivos React
Move-Item src $frontend/
Move-Item package.json $frontend/
Move-Item package-lock.json $frontend/
Move-Item vite.config.js $frontend/
Move-Item index.html $frontend/
Move-Item .env $frontend/ -Force -ErrorAction SilentlyContinue

# Backup do .env original
if (Test-Path ".env") {
  Copy-Item .env ".env.bak"
}
```

## 🔄 Após a Reorganização

### Terminal 1: Backend
```bash
cd backend
npm install
npm start
```

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🗂️ Arquivos de Configuração da Raiz

Mantenha na raiz apenas:

```
softclin-agenda-v2.0/
├── README.md                          # Documentação principal
├── ESTRUTURA.md                       # Este arquivo
├── MIGRACAO_POSTGRESQL.md             # Guia de migração
├── SoftClin-Agenda-API.postman_collection.json
├── supabase-setup.sql                 # Schema do banco
├── Dockerfile                         # (Opcional, para raiz)
├── docker-compose.yml                 # (Opcional, para raiz)
├── .gitignore                         # (Raiz)
├── .git/
├── frontend/
└── backend/
```

## 🧹 Limpeza

Você pode deletar da raiz:
- ~~`src/`~~ (movido para frontend)
- ~~`package.json`~~ (movido para frontend)
- ~~`vite.config.js`~~ (movido para frontend)
- ~~`index.html`~~ (movido para frontend)
- ~~`.env.example`~~ (movido para frontend)

## ✅ Checklist de Validação

Após a reorganização, verifique:

- [ ] Pasta `frontend/` existe com `package.json`
- [ ] Pasta `backend/` existe com `server.js`
- [ ] `frontend/.env` tem `VITE_API_URL=http://localhost:3001/api`
- [ ] `backend/.env` tem credenciais PostgreSQL
- [ ] `npm install` funciona em `frontend/`
- [ ] `npm install` funciona em `backend/`
- [ ] `npm run dev` inicia o frontend
- [ ] `npm start` inicia o backend
- [ ] Frontend conecta ao backend (testa em /api/profissionais)

## 🚀 Próximos Passos

1. **Confirme que tudo funciona**
2. **Faça um commit git:**
   ```bash
   git add .
   git commit -m "refactor: reorganizar em monorepo (frontend + backend)"
   ```
3. **Delete arquivos antigos da raiz**
4. **Atualize documentação se necessário**

## 📚 Referências

- [frontend/README.md](../frontend/README.md) - Como usar o frontend
- [backend/README.md](../backend/README.md) - Como usar o backend
- [ESTRUTURA.md](../ESTRUTURA.md) - Visão geral do projeto

---

**Nota:** Este processo pode ser feito gradualmente. Você pode ter frontend e backend rodando ao mesmo tempo durante a transição.
