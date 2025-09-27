import apiClient from './api';

/**
 * Cria uma nova solicitação de loja para o usuário logado.
 * Corresponde ao endpoint: POST /api/v1/lojas
 * @param {object} storeData - Os dados da loja (ex: { nome_fantasia, cnpj, cep })
 */
export const createStore = async (storeData) => {
  try {
    const response = await apiClient.post('/api/v1/lojas', storeData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar a loja:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Busca a lista de lojas com status pendente.
 * Requer autenticação de admin.
 * Corresponde a: GET /api/v1/lojas/admin/pendentes
 */
export const getPendingStores = async () => {
  try {
    const response = await apiClient.get('/api/v1/lojas/admin/pendentes');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lojas pendentes:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Aprova a criação de uma loja.
 * Requer autenticação de admin.
 * Corresponde a: POST /api/v1/lojas/admin/{loja_id}/approve
 * @param {number | string} storeId - O ID da loja a ser aprovada.
 */
export const approveStore = async (storeId) => {
  try {
    const response = await apiClient.post(`/api/v1/lojas/admin/${storeId}/approve`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao aprovar loja ${storeId}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Rejeita a criação de uma loja.
 * Requer autenticação de admin.
 * Corresponde a: POST /api/v1/lojas/admin/{loja_id}/reject
 * @param {number | string} storeId - O ID da loja a ser rejeitada.
 * @param {string} reason - O motivo da rejeição.
 */
export const rejectStore = async (storeId, reason) => {
  try {
    // A API espera um objeto com a chave "motivo" no corpo da requisição
    const response = await apiClient.post(`/api/v1/lojas/admin/${storeId}/reject`, { motivo: reason });
    return response.data;
  } catch (error) {
    console.error(`Erro ao rejeitar loja ${storeId}:`, error.response?.data || error.message);
    throw error;
  }
};