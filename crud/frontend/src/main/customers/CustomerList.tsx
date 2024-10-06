import React, { useEffect, useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  document: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Chama o serviço que buscará os dados da API
    fetch('http://localhost:3001/customers')  // Atualize a URL aqui
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error('Erro ao buscar clientes:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Documento</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.document}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;