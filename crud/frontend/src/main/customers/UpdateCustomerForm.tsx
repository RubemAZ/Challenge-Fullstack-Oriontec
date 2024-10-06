import React, { useState } from 'react';
import axios from 'axios';

interface UpdateCustomerFormProps {
  id: string; // Passe o ID do cliente a ser atualizado
}

const UpdateCustomerForm: React.FC<UpdateCustomerFormProps> = ({ id }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/api/customers/${id}`, {
      name,
      email,
      document
    })
    .then(() => {
      alert('Cliente atualizado com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao atualizar cliente:', error);
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label>Nome:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Documento:</label>
        <input type="text" value={document} onChange={(e) => setDocument(e.target.value)} required />
      </div>
      <button type="submit">Atualizar Cliente</button>
    </form>
  );
};

export default UpdateCustomerForm;
