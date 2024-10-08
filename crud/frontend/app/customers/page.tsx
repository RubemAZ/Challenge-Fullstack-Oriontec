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
  }, []);
  
  return (
    <div>
      <div>
        <div className="pt-5 mt-5">
          <h1 className="py-3 m-3 text-center text-3xl font-bold">Lista de Clientes</h1>
        </div>

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