import React, { useState } from 'react';

const CustomerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');

  return (
    <div>
      <h2>Adicionar Cliente</h2>
      <form id="customer-form">
        <div>
          <label htmlFor="customer-name">Nome:</label>
          <input
            type="text"
            id="customer-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="customer-email">E-mail:</label>
          <input
            type="email"
            id="customer-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="customer-document">Documento:</label>
          <input
            type="text"
            id="customer-document"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;