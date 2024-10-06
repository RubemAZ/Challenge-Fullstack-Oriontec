import React, { useState } from 'react';
import { createCustomer } from '@/src/external/api/customers/customerService';

const CustomerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer({
        name,
        email,
        document
      })
      alert('Cliente adicionado com sucesso!');
      // Limpar os campos do formulário
      setName('');
      setEmail('');
      setDocument('');
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      alert('Erro ao adicionar cliente.');
    }
  };

  return (
    <div>
      <h2>Adicionar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Documento:</label>
          <input
            type="text"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default CustomerForm;
