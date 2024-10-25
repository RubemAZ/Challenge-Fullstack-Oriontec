import axios from 'axios';

const API_URL = 'https://challenge-fullstack-oriontec-backend.onrender.com/api/customers';

export const updateCustomer = async (id: number, customerData: { name: string; email: string; document: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, customerData);
    return response.data; // Retorna os dados do cliente atualizado, se necessário
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error; // Re-throw the error for handling in the caller function
  }
};
