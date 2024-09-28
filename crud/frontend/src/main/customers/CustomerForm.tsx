import React, { useState } from 'react';

const CustomerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCustomer = { name, email, document };
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        // Cliente foi criado com sucesso
        alert('Cliente criado com sucesso');
      } else {
        // Lidar com erro
        alert('Erro ao criar cliente');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Documento</label>
        <input
          type="text"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          required
        />
      </div>
      <button type="submit">Salvar Cliente</button>
    </form>
  );
};

export default CustomerForm;