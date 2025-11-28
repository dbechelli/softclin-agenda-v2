/**
 * Database Service - Abstração para comunicação com PostgreSQL
 * Pode ser usado tanto com Supabase quanto com um backend Node.js/Express personalizado
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

class DatabaseService {
  /**
   * GET - Buscar dados
   * @param {string} table - Nome da tabela
   * @param {object} options - Opções de filtro e ordenação
   * @returns {Promise<{data: Array, error: null|object}>}
   */
  async select(table, options = {}) {
    try {
      const params = new URLSearchParams()
      
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params.append(`filter[${key}]`, value)
        })
      }
      
      if (options.orderBy) {
        params.append('orderBy', options.orderBy)
        if (options.ascending !== undefined) {
          params.append('ascending', options.ascending)
        }
      }
      
      if (options.limit) {
        params.append('limit', options.limit)
      }

      const queryString = params.toString()
      const url = `${API_URL}/api/${table}${queryString ? '?' + queryString : ''}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        const error = await response.json()
        return { data: null, error }
      }

      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: error.message } }
    }
  }

  /**
   * POST - Inserir novo registro
   * @param {string} table - Nome da tabela
   * @param {object|Array} records - Registro(s) a inserir
   * @returns {Promise<{data: Array|object, error: null|object}>}
   */
  async insert(table, records) {
    try {
      const response = await fetch(`${API_URL}/api/${table}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(Array.isArray(records) ? records : [records])
      })

      if (!response.ok) {
        const error = await response.json()
        return { data: null, error }
      }

      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: error.message } }
    }
  }

  /**
   * PATCH - Atualizar registro(s)
   * @param {string} table - Nome da tabela
   * @param {object} updates - Dados a atualizar
   * @param {object} filters - Filtros WHERE
   * @returns {Promise<{data: Array, error: null|object}>}
   */
  async update(table, updates, filters) {
    try {
      const params = new URLSearchParams()
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          params.append(`filter[${key}]`, value)
        })
      }

      const queryString = params.toString()
      const url = `${API_URL}/api/${table}${queryString ? '?' + queryString : ''}`

      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        const error = await response.json()
        return { data: null, error }
      }

      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: error.message } }
    }
  }

  /**
   * DELETE - Deletar registro(s)
   * @param {string} table - Nome da tabela
   * @param {object} filters - Filtros WHERE
   * @returns {Promise<{data: Array, error: null|object}>}
   */
  async delete(table, filters) {
    try {
      const params = new URLSearchParams()
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          params.append(`filter[${key}]`, value)
        })
      }

      const queryString = params.toString()
      const url = `${API_URL}/api/${table}${queryString ? '?' + queryString : ''}`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        const error = await response.json()
        return { data: null, error }
      }

      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: error.message } }
    }
  }

  /**
   * Headers padrão para requisições
   */
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_API_KEY || ''}`
    }
  }
}

export const db = new DatabaseService()
