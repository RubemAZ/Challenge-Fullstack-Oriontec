"use client";
import { FC, useEffect, useState } from 'react';
import CustomerSection from '../components/CustomerSection';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomerItem from '../components/CustomerItem';
import { fetchCustomers, editCustomer, removeCustomer, createCustomer } from '@/src/external/api/customers/customerService';
import CustomerPresenter, { CustomerData } from '@/src/adapters/customers/CustomerPresenter';

const CustomersPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const MySwal = withReactContent(Swal);

  const loadCustomers = async () => {
    setLoading(true)
    const data = await fetchCustomers();
    setCustomers(data.map((item: CustomerData) => CustomerPresenter.present(item)));
    setLoading(false)
  };

  useEffect(() => {
    loadCustomers();
    
  }, []);

  const [searchQuery, setSearchQuery] = useState('')
  
  const handleAdd = () => {
    MySwal.fire({
      title: 'Adicionar Novo Cliente',
      html: `
        <form id="customer-form">
          <label for="customer-name">Nome:</label>
          <input id="customer-name" type="text" required class="swal2-input" placeholder="Nome" />
          <label for="customer-email">Email:</label>
          <input id="customer-email" type="email" required class="swal2-input" placeholder="Email" />
          <label for="customer-doc">CNPJ/CPF:</label>
          <input id="customer-doc" type="number" required class="swal2-input" placeholder="CNPJ/CPF" />
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      customClass: {
        confirmButton: 'bg-green-500 text-white',
        cancelButton: 'bg-red-500 text-white'
      },
      preConfirm: async () => {
        const name = (document.getElementById('customer-name') as HTMLInputElement).value;
        const email = (document.getElementById('customer-email') as HTMLInputElement).value;
        const doc = (document.getElementById('customer-doc') as HTMLInputElement).value.toString();

        if (![11, 14].includes(doc.length)) {
          Swal.showValidationMessage('Documento inválido');
          return false;
        }

        if (!name || !email || !doc) {
          Swal.showValidationMessage('Preencha todos os campos.');
          return false;
        }

        // Envio dos dados ao backend
        try {
          await createCustomer({ name, email, document: doc });
          await loadCustomers()
          return true;
        } catch (error) {
          Swal.showValidationMessage('Erro ao adicionar cliente.');
          return false;
        }
      }
    });
  }

  return (
    <section className="bg-slate-300 pt-9">
      <div className="bg-slate-100">
          <CustomerSection onSearch={setSearchQuery} 
          onCustomerAdded={() => {}} />

          <article className="bg-slate-100">
        <div>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white mx-3 px-4 py-2 rounded hover:bg-green-600"
          >
            Adicionar Cliente
          </button>
        </div>
      </article>

      {customers.length ? (
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
            {customers.map((customer) => <CustomerItem key={customer.id} customer={customer} />)}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cliente cadastrado</p>
      )}
          
      </div>

    </section>
  );
};

export default CustomersPage;
