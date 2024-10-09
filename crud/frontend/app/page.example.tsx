"use client";
import React, { useState, useEffect } from 'react';

const CustomersPage = ({ searchQuery }: { searchQuery: string }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);

  // Função para buscar clientes no backend
  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/customers');
      if (!response.ok) {
        throw new Error('Erro ao buscar clientes');
      }
      const data = await response.json();
      setCustomers(data);
      setFilteredCustomers(data); // Inicialmente, todos os clientes são exibidos
    } catch (error) {
      console.error(error);
    }
  };

  // Função chamada quando o campo de busca é alterado
  useEffect(() => {
    const filtered = customers.filter((customer) => 
      customer.name && // Verifica se o nome existe
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCustomers(filtered); // Atualiza os clientes filtrados com base na busca
  }, [searchQuery, customers]); // Reexecuta o filtro sempre que a query de busca ou lista de clientes mudar

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1 className="pt-52 text-2xl font-bold my-4">Lista de Clientes</h1>
      <ul>
        {filteredCustomers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.email} - {customer.document}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;