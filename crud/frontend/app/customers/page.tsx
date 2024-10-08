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
    
    {customers.map((customer) => (
      <li key={customer.id}>{customer.name}</li>
    ))}

    
    customerList();
  }, []);
  
  return (
    <div>
      <div>
        <h1>Lista de Clientes</h1>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">RG/CPF</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="border border-gray-300 p-2">{customer.name}</td>
                <td className="border border-gray-300 p-2">{customer.email}</td>
                <td className="border border-gray-300 p-2">{customer.document}</td>
                <td className="border border-gray-300 p-2">
                  {/* Botões para editar e excluir */}
                  <button onClick={() => console.log('Edit', customer.id)}>Editar</button>
                  <button onClick={() => console.log('Delete', customer.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CustomersPage;