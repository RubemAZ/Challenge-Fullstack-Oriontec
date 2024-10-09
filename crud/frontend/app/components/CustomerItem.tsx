"use client"; 
import { useEffect, useState } from 'react';
import CustomerPresenter, { CustomerData } from '@/src/adapters/customers/CustomerPresenter';
import { updateCustomer } from '@/src/external/api/customers/updateCustomer';
import { fetchCustomers} from '@/src/external/api/customers/customerService';
import {deleteCustomer } from '@/src/external/api/customers/deleteCustomer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface CustomerItemProps {
  customer: CustomerData
}

const CustomerItem = ({ customer }: CustomerItemProps) => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // Função para buscar clientes na API
    const customerList = async () => {
      try {
        const data: CustomerData[] = await fetchCustomers() as CustomerData[];
        setCustomers(data.map((item) => CustomerPresenter.present(item)));
      } catch (error) {
        console.error(error);
      }
    };
    customerList();
  }, []);

  // Função para editar cliente
  const handleEdit = (customer: CustomerData) => {
    MySwal.fire({
      title: 'Editar Cliente',
      html: `
        <input id="customer-name" class="swal2-input" placeholder="Nome" value="${customer.name}" />
        <input id="customer-email" class="swal2-input" placeholder="Email" value="${customer.email}" />
        <input id="customer-document" class="swal2-input" placeholder="Documento" value="${customer.document}" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      customClass: {
        confirmButton: 'bg-green-500 text-white',   // Classe para o botão de confirmação
        cancelButton: 'bg-red-500 text-white'      // Classe para o botão de cancelamento
      },
      preConfirm: () => {
        const name = (document.getElementById('customer-name') as HTMLInputElement).value;
        const email = (document.getElementById('customer-email') as HTMLInputElement).value;
        const customerDocument = (document.getElementById('customer-document') as HTMLInputElement).value;

        if (!name || !email || !customerDocument) {
          Swal.showValidationMessage('Preencha todos os campos.');
          return false;
        }
        return { id: customer.id, name, email, document: customerDocument }; // Retorna os dados do cliente editado
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedCustomer = result.value; // Os dados do cliente editado
        console.log('Cliente editado:', updatedCustomer);

        try {
          await updateCustomer(updatedCustomer.id, updatedCustomer); // Atualiza o cliente no backend
          Swal.fire('Sucesso!', 'Cliente editado com sucesso!', 'success');
          
          // Atualize a lista de clientes no estado local se necessário
          setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c)); // Atualiza a lista de clientes localmente
        } catch (error) {
          console.error('Erro ao editar cliente:', error);
          Swal.fire('Erro!', 'Erro ao editar o cliente.', 'error');
        }
      }
    });
  };

  // Função para excluir cliente
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter essa ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCustomer(id); // Função de exclusão
        setCustomers(customers.filter((customer) => customer.id !== id)); // Remove o cliente da lista local
        Swal.fire('Deletado!', 'O cliente foi deletado com sucesso.', 'success');
      } catch (error) {
        Swal.fire('Erro!', 'Erro ao deletar o cliente.', 'error');
      }
    }
  };

  return (
    <tr key={customer.id}>
      <td className="border border-gray-300 p-3">{customer.name}</td>
      <td className="border border-gray-300 p-3">{customer.email}</td>
      <td className="border border-gray-300 p-3">{customer.document}</td>
      <td className="border border-gray-300 p-3 flex justify-center">
        <button
          className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
          onClick={() => handleEdit(customer)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          onClick={() => handleDelete(customer.id)}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default CustomerItem;