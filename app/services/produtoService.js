// app/services/produtoService.js
import apiClient from './api';

// --- Funções para o formulário de criação ---

/**
 * Busca todas as categorias.
 * Corresponde a: GET /api/v1/categorias
 */
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/api/v1/categorias');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
};

/**
 * Busca todas as tags.
 * Corresponde a: GET /api/v1/tags
 */
export const getTags = async () => {
  try {
    const response = await apiClient.get('/api/v1/tags');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    return [];
  }
};

/**
 * Cria um novo produto na loja do vendedor logado.
 * Corresponde a: POST /api/v1/produtos/minha-loja
 * @param {object} productData - Os dados do produto (nome, preco, etc.)
 */
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/api/v1/produtos/minha-loja', productData);
    return response.data; // Retorna o produto recém-criado, que inclui o ID
  } catch (error) {
    console.error("Erro ao criar produto:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Faz upload de imagens para um produto específico.
 * Corresponde a: POST /api/v1/produtos/{produto_id}/imagens
 * @param {number | string} productId - O ID do produto.
 * @param {FileList} files - Os arquivos de imagem do input.
 */
export const uploadProductImages = async (productId, files) => {
  const formData = new FormData();
  // A API espera um campo 'files', então adicionamos cada arquivo a ele.
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  try {
    const response = await apiClient.post(`/api/v1/produtos/${productId}/imagens`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error.response?.data || error.message);
    throw error;
  }
};