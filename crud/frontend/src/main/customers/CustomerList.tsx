import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Customer {
  id: number;
  name: string;
  email: string;
  document: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Chama o serviço que buscará os dados da API usando Axios
    axios.get('http://localhost:3000/api/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
      });
  }, []);

  const deleteCustomer = (id: number) => {
    axios.delete(`http://localhost:3000/api/customers/${id}`)
      .then(() => {
        alert('Cliente deletado com sucesso!');
        setCustomers(customers.filter((customer) => customer.id !== id)); // Remove o cliente da lista
      })
      .catch((error) => {
        console.error('Erro ao deletar cliente:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Documento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.document}</td>
              <td>
                <button onClick={() => deleteCustomer(customer.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;