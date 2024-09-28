"use client"; 
import { useEffect, useState } from 'react';

const CustomersPage = () => {
  const [customers, setCustomers] = useState<any[]>([]); // Estado para armazenar clientes

  useEffect(() => {
    // Faz a requisição para a API
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/customers'); // URL da API
        if (!response.ok) {
          throw new Error('Erro ao buscar clientes');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;