"use client"; 
import CustomerPresenter, { CustomerData } from '@/src/adapters/customers/CustomerPresenter';
import { fetchCustomers } from '@/src/external/api/customers/customerService';
import { useEffect, useState } from 'react';

const CustomersPage = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]); // Estado para armazenar clientes

  useEffect(() => {
    // Faz a requisição para a API
    const customerList = async () => {
      try {
        const data: CustomerData[] = await fetchCustomers() as CustomerData[]

        setCustomers(data.map((item) => CustomerPresenter.present(item)))
      } catch (error) {
        console.error(error);
      }
    };

    customerList();
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