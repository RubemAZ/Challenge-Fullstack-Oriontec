import { useState, } from 'react';
import Swal from "sweetalert2";

interface CustomerFormProps {
  initialData?: { name?: string, email?: string, document?: string };
  onSubmit: (data: { name: string, email: string, document: string }) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ initialData = {}, onSubmit }) => {
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [document, setDocument] = useState(initialData.document || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(e)
    if (![11, 14].includes(document.length)) {
      Swal.showValidationMessage("Documento inválido");
      return false;
    }

    if (!name || !email || !document) {
      Swal.showValidationMessage("Preencha todos os campos.");
      return false;
    }

    onSubmit({ name, email, document });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          id="customer-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>E-mail:</label>
        <input
          id="customer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Documento:</label>
        <input
          id="customer-document"
          type="text"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          required
        />
      </div>
      <button type="button" onClick={handleSubmit}>Salvar</button>
    </form>
  );
};

export default CustomerForm;
