import axios from 'axios';

const API_URL = 'http://localhost:3000/api/customers'; // Atualize com a URL da sua API

export const updateCustomer = async (id: number, customerData: { name: string; email: string; document: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, customerData);
    return response.data; // Retorna os dados do cliente atualizado, se necessário
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error; // Re-throw the error for handling in the caller function
  }
};
