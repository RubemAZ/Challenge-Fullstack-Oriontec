import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomerForm from './CustomerForm';

const MySwal = withReactContent(Swal);

interface CustomerModalProps {
  initialData?: { id?: number, name?: string, email?: string, document?: string };
  onSubmit: (data: { id?: number, name: string, email: string, document: string }) => void;
  mode: 'create' | 'edit';
}

const CustomerModal: React.FC<CustomerModalProps> = ({ initialData = {}, onSubmit, mode }) => {
  const showModal = () => {
    MySwal.fire({
      title: mode === 'edit' ? 'Editar Cliente' : 'Adicionar Cliente',
      html: (
        <CustomerForm 
          initialData={initialData} 
          onSubmit={(data) => {
            onSubmit(data);
            MySwal.close();
          }} 
        />
      ),
      showCancelButton: true,
      confirmButtonText: 'Salvar',
    });
  };

  return (
    <button onClick={showModal} className={mode === 'edit' ? 'bg-green-500 text-white px-4 py-1 rounded mr-2' : 'bg-green-500 text-white px-4 py-2 rounded'}>
      {mode === 'edit' ? 'Editar Cliente' : 'Adicionar Cliente'}
    </button>
  );
};

export default CustomerModal;