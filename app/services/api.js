// app/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  // A baseURL agora é lida da variável de ambiente
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default apiClient;