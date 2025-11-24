# Migração de Supabase para PostgreSQL

## 📋 Resumo das Mudanças

O projeto foi adaptado para comunicar com PostgreSQL através de uma API REST, em vez de conectar diretamente ao Supabase. As estruturas das tabelas permaneceram iguais.

## 🔄 Mudanças Realizadas

### Frontend (React/Vite)

1. **Novo arquivo `src/lib/db.js`**
   - Serviço abstrato de database que não depende do Supabase
   - Funciona como intermediário entre o frontend e o backend
   - Oferece métodos: `select()`, `insert()`, `update()`, `delete()`

2. **Atualizações em `App.jsx`**
   - Substituído `import { supabase }` por `import { db }`
   - `supabase.from('profissionais').select()` → `db.select('profissionais')`
   - `supabase.from('agendamentos').select().order()` → `db.select('agendamentos', { orderBy: 'data_consulta' })`

3. **Atualizações em `GestaoProfissionais.jsx`**
   - Substituído `import { supabase }` por `import { db }`
   - `supabase.from().insert()` → `db.insert()`
   - `supabase.from().update().eq()` → `db.update()`

4. **Variáveis de Ambiente (`.env`)**
   - Antes: `VITE_SUPABASE_URL` e `VITE_SUPABASE_KEY`
   - Agora: `VITE_API_URL` e `VITE_API_KEY`

### Backend (Node.js/Express)

Um arquivo `server.js` foi criado como exemplo de implementação. Este arquivo:

- Configura um servidor Express na porta 3001
- Conecta ao PostgreSQL
- Implementa as rotas esperadas pelo frontend:
  - `GET /api/profissionais` - Listar profissionais com filtros
  - `POST /api/profissionais` - Criar novo profissional
  - `PATCH /api/profissionais` - Atualizar profissional
  - `DELETE /api/profissionais` - Deletar profissional
  - `GET /api/agendamentos` - Listar agendamentos
  - `POST /api/agendamentos` - Criar agendamento

## 🚀 Como Usar

### Opção 1: Usar o Backend Node.js Fornecido

1. **Instale as dependências do backend:**
   ```bash
   npm install express pg dotenv cors
   ```

2. **Configure as variáveis de ambiente:**
   - Copie `.env.backend.example` para `.env` na raiz do projeto
   - Atualize com suas credenciais do PostgreSQL

3. **Crie as tabelas no PostgreSQL:**
   ```sql
   -- Use o arquivo supabase-setup.sql como referência
   -- As estruturas das tabelas são idênticas
   ```

4. **Inicie o backend:**
   ```bash
   node server.js
   ```

5. **Configure o frontend (em outro terminal):**
   ```bash
   # Copie .env.example para .env
   # Deixe VITE_API_URL como http://localhost:3001/api
   npm run dev
   ```

### Opção 2: Usar um Backend Existente

Se você já tem um backend pronto, apenas certifique-se de:

1. As rotas seguem o padrão documentado em `server.js`
2. As variáveis de ambiente estão corretas
3. A autenticação via Bearer token é implementada (opcional, mas recomendado)

## 📊 Mapeamento de Queries

### Supabase → Novo Sistema

**SELECT com filtro:**
```javascript
// Antes
supabase.from('profissionais').select('*').eq('ativo', true)

// Depois
db.select('profissionais', { filters: { ativo: true } })
```

**SELECT com ordenação:**
```javascript
// Antes
supabase.from('agendamentos').select('*').order('data_consulta', { ascending: true })

// Depois
db.select('agendamentos', { orderBy: 'data_consulta', ascending: true })
```

**INSERT:**
```javascript
// Antes
supabase.from('profissionais').insert([formData])

// Depois
db.insert('profissionais', formData)
```

**UPDATE:**
```javascript
// Antes
supabase.from('profissionais').update(formData).eq('id', id)

// Depois
db.update('profissionais', formData, { id: id })
```

## 🔐 Segurança

A autenticação é feita via Bearer Token no header `Authorization`:
```
Authorization: Bearer sua_chave_api_aqui
```

Para aumentar a segurança:
1. Use variáveis de ambiente para a chave API
2. Implemente validação de token no backend
3. Use HTTPS em produção
4. Considere implementar JWT

## 📝 Próximos Passos

1. Revisar o arquivo `server.js` e adaptá-lo à sua arquitetura
2. Implementar validações adicionais no backend
3. Adicionar mais rotas conforme necessário
4. Considerar adicionar autenticação de usuário
5. Documentar endpoints da API

## ⚠️ Notas Importantes

- As estruturas das tabelas **não foram alteradas**
- Os dados existentes continuarão funcionando da mesma forma
- Você pode migrar gradualmente de Supabase para PostgreSQL
- O arquivo `supabase.js` pode ser removido após a migração completa
