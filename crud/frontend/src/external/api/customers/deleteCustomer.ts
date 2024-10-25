import axios from 'axios';

export const deleteCustomer = async (id: number) => {
  return await axios.delete(`https://challenge-fullstack-oriontec-backend.onrender.com/api/customers/${id}`);
};