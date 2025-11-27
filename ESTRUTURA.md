# Estrutura do Projeto SoftClin Agenda v2.0

Este é um monorepo com frontend (React) e backend (Node.js/Express) separados.

## 📁 Estrutura

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
│   ├── .env
│   └── README.md
│
└── docs/
    ├── MIGRACAO_POSTGRESQL.md
    ├── SETUP.md
    └── API.md
```

## 🚀 Quick Start

### Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

## 📚 Documentação

- **[MIGRACAO_POSTGRESQL.md](./MIGRACAO_POSTGRESQL.md)** - Como migrar de Supabase para PostgreSQL
- **[backend/README.md](./backend/README.md)** - Documentação do backend
- **[SoftClin-Agenda-API.postman_collection.json](./SoftClin-Agenda-API.postman_collection.json)** - Testes da API

## 🔗 Ambiente

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:3001/api
VITE_API_KEY=sua_chave_api_aqui
```

### Backend (`backend/.env`)
```
PORT=3001
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=softclin_agenda
API_KEY=sua_chave_api_secreta
```

## 📦 Dependências

- **Frontend**: React 18, Vite, FullCalendar, Lucide Icons
- **Backend**: Express, PostgreSQL (pg), CORS, dotenv

## 🐳 Docker (Opcional)

```bash
docker-compose up
```

## 📞 Suporte

Consulte os arquivos README em cada pasta para mais detalhes.
