import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createCustomer } from '@/src/external/api/customers/customerService'; // Importação do serviço para criar cliente

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const MySwal = withReactContent(Swal);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleAddCustomer = () => {
    MySwal.fire({
      title: 'Adicionar Novo Cliente',
      html: `
        <form id="customer-form">
          <label for="customer-name">Nome:</label>
          <input id="customer-name" type="text" required class="swal2-input" placeholder="Nome" />
          <label for="customer-email">Email:</label>
          <input id="customer-email" type="email" required class="swal2-input" placeholder="Email" />
          <label for="customer-doc">RG/CPF:</label>
          <input id="customer-doc" type="text" required class="swal2-input" placeholder="RG/CPF" />
        </form>
        `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      customClass: {
        confirmButton: 'bg-green-500 text-white',   // Classe para o botão de confirmação
        cancelButton: 'bg-red-500 text-white'      // Classe para o botão de cancelamento
      },
      preConfirm: async () => {
        const name = (document.getElementById('customer-name') as HTMLInputElement).value;
        const email = (document.getElementById('customer-email') as HTMLInputElement).value;
        const doc = (document.getElementById('customer-doc') as HTMLInputElement).value;

        if (!name || !email || !doc) {
          Swal.showValidationMessage('Preencha todos os campos.');
          return false;
        }

        // Envio dos dados ao backend
        try {
          await createCustomer({ name, email, document: doc });
          return true;  // Sucesso
        } catch (error) {
          Swal.showValidationMessage('Erro ao adicionar cliente.');
          return false;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Sucesso', 'Cliente adicionado com sucesso!', 'success');
      }
    });
  };

  return (
    <div className="fixed max-w-full w-full">
      <nav className="bg-slate-200 p-4 flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          <img src="/img/logo-oriontec.webp" alt="Logo" />
        </div>

        <div className="flex items-center space-x-">
          <input
            type="text"
            placeholder="Pesquisar cliente..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 rounded border border-gray-300"
          />

          <button
            onClick={handleAddCustomer}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Adicionar Cliente
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;