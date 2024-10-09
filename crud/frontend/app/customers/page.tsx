"use client";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomerItem from '../components/CustomerItem';
import { fetchCustomers, createCustomer } from '@/src/external/api/customers/customerService';
import CustomerPresenter, { CustomerData } from '@/src/adapters/customers/CustomerPresenter';

interface CustomerSectionProps {
  onSearch: (query: string) => void;
  onCustomerAdded: () => void;
}

const CustomersPage: React.FC<CustomerSectionProps> = ({ onSearch }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const MySwal = withReactContent(Swal);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estados controlados para os campos do modal
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [doc, setDoc] = useState('');

  const loadCustomers = async () => {
    setLoading(true);
    const data = await fetchCustomers();
    setCustomers(data.map((item: CustomerData) => CustomerPresenter.present(item)));
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAdd = () => {
    // Limpa os campos ao abrir o modal
    setName('');
    setEmail('');
    setDoc('');

    MySwal.fire({
      title: 'Adicionar Novo Cliente',
      html: (
        <form id="customer-form">
          <label htmlFor="customer-name">Nome:</label>
          <input
            id="customer-name"
            type="text"
            required
            className="swal2-input"
            placeholder="Nome"
            value={name} // Controlado pelo estado
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="customer-email">Email:</label>
          <input
            id="customer-email"
            type="email"
            required
            className="swal2-input"
            placeholder="Email"
            value={email} // Controlado pelo estado
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="customer-doc">CNPJ/CPF:</label>
          <input
            id="customer-doc"
            type="number"
            required
            className="swal2-input"
            placeholder="CNPJ/CPF"
            value={doc} // Controlado pelo estado
            onChange={(e) => setDoc(e.target.value)}
          />
        </form>
      ),
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      customClass: {
        confirmButton: 'bg-green-500 text-white',
        cancelButton: 'bg-red-500 text-white',
      },
      preConfirm: async () => {
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
          await loadCustomers();
          return true;
        } catch (error) {
          Swal.showValidationMessage('Erro ao adicionar cliente.');
          return false;
        }
      },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <section className="bg-slate-100 py-32">
      <div className="mb-12">
        <h1 className="text-slate-600 py-6 text-3xl text-center">Sistema de Gerenciamento de Clientes</h1>
      </div>

      <div className="my-9">
        <h2 className="text-slate-600 text-2xl text-center">Lista de clientes</h2>
      </div>

      <div className="text-center my-12">
        <input
          type="text"
          placeholder="Pesquisar CPF/CNPJ ..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded border border-gray-300 p-3 "
        />

        <button
          onClick={handleAdd}
          className="rounded bg-green-500 hover:bg-green-600 text-white font-bold p-3 mx-6"
        >
          + Adicionar Cliente
        </button>

        <button
          onClick={loadCustomers}
          className="rounded bg-green-500 hover:bg-green-600 text-white font-bold p-3"
        >
          🗘 Atualizar Lista
        </button>
      </div>

      {customers.length ? (
        <table className="mx-auto border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-3">Nome</th>
              <th className="border border-gray-300 p-3">Email</th>
              <th className="border border-gray-300 p-3">RG/CPF</th>
              <th className="border border-gray-300 p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <CustomerItem key={customer.id} customer={customer} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cliente cadastrado</p>
      )}
    </section>
  );
};

export default CustomersPage;
