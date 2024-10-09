"use client"; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomerPresenter, { CustomerData } from '@/src/adapters/customers/CustomerPresenter';
import { updateCustomer } from '@/src/external/api/customers/updateCustomer';
import { deleteCustomer } from '@/src/external/api/customers/deleteCustomer';

interface CustomerItemProps {
  customer: CustomerData;
  onUpdate: () => void; // Função para atualizar a lista de clientes
}

const CustomerItem = ({ customer, onUpdate }: CustomerItemProps) => {
  const MySwal = withReactContent(Swal);

  // Função para editar cliente
  const handleEdit = () => {
    MySwal.fire({
      title: 'Editar Cliente',
      html: `
        <input type="text" id="customer-name" class="swal2-input" placeholder="Nome" value="${customer.name}" />
        <input type="email" id="customer-email" class="swal2-input" placeholder="Email" value="${customer.email}" />
        <input type="number" id="customer-document" class="swal2-input" placeholder="Documento" value="${customer.document}" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      customClass: {
        confirmButton: 'bg-green-500 text-white',
        cancelButton: 'bg-red-500 text-white',
      },
      preConfirm: () => {
        const name = (document.getElementById('customer-name') as HTMLInputElement).value;
        const email = (document.getElementById('customer-email') as HTMLInputElement).value;
        const doc = (document.getElementById('customer-document') as HTMLInputElement).value;

        if (![11, 14].includes(doc.length)) {
          Swal.showValidationMessage("Documento inválido");
          return false;
        }

        if (!name || !email || !doc) {
          Swal.showValidationMessage('Preencha todos os campos.');
          return false;
        }
        return { id: customer.id, name, email, document: doc };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedCustomer = result.value;
        try {
          await updateCustomer(updatedCustomer.id, updatedCustomer);
          Swal.fire('Sucesso!', 'Cliente editado com sucesso!', 'success');
          onUpdate(); // Chama a função para atualizar a lista de clientes
        } catch (error) {
          console.error('Erro ao editar cliente:', error);
          Swal.fire('Erro!', 'Erro ao editar o cliente.', 'error');
        }
      }
    });
  };

  // Função para excluir cliente
  const handleDelete = async () => {
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
        await deleteCustomer(customer.id);
        Swal.fire('Deletado!', 'O cliente foi deletado com sucesso.', 'success');
        onUpdate(); // Chama a função para atualizar a lista de clientes
      } catch (error) {
        Swal.fire('Erro!', 'Erro ao deletar o cliente.', 'error');
      }
    }
  };

  return (
    <tr key={customer.id}>
      <td className="border border-gray-300 py-2 px-9">{customer.name}</td>
      <td className="border border-gray-300 py-2 px-9">{customer.email}</td>
      <td className="border border-gray-300 py-2 px-9">{customer.document}</td>
      <td className="border border-gray-300 py-2 px-9 flex justify-center">
        <button
          className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
          onClick={handleEdit}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default CustomerItem;