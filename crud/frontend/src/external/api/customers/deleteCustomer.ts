import axios from 'axios';

export const deleteCustomer = async (id: number) => {
  return await axios.delete(`http://localhost:3000/api/customers/${id}`);
};