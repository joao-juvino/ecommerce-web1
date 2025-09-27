import apiClient from './api';

export const getMe = async () => {
  try {
    const response = await apiClient.get('/api/v1/usuarios/me');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error.response?.data || error.message);
    throw error;
  }
};