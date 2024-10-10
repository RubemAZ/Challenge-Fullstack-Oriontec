"use client";
import { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CustomerItem from "../components/CustomerItem";
import { fetchCustomers, createCustomer } from "@/src/external/api/customers/customerService";
import CustomerPresenter, { CustomerData } from "@/src/adapters/customers/CustomerPresenter";

interface CustomerSectionProps {
  onCustomerAdded: () => void;
}

const CustomersPage: FC<CustomerSectionProps> = ({ }) => {
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<CustomerData[]>([]);

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
    MySwal.fire({
      title: "Adicionar Novo Cliente",
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
      confirmButtonText: "Salvar",
      customClass: {
        confirmButton: "bg-green-500 text-white",
        cancelButton: "bg-red-500 text-white",
      },
      preConfirm: async () => {
        const name = (document.getElementById("customer-name") as HTMLInputElement).value;
        const email = (document.getElementById("customer-email") as HTMLInputElement).value;
        const doc = (document.getElementById("customer-doc") as HTMLInputElement).value.toString();

        if (![11, 14].includes(doc.length)) {
          Swal.showValidationMessage("Documento inválido");
          return false;
        }

        if (!name || !email || !doc) {
          Swal.showValidationMessage("Preencha todos os campos.");
          return false;
        }

        try {
          await createCustomer({ name, email, document: doc });
          await loadCustomers(); // Atualiza a lista de clientes após adição
          return true;
        } catch (error) {
          Swal.showValidationMessage("Erro ao adicionar cliente.");
          return false;
        }
      },
    });
  };

  return (
    <section className="bg-slate-100 py-32 m-9 shadow-xl rounded">

      <div className="grid justify-items-center">
        <h1 className="text-slate-600 pb-20 text-3xl text-center ">Sistema de Gerenciamento de Clientes - Lista de clientes</h1>
          <div className="grid-rows-1">
            <div className="grid grid-cols-3">
              <div className="mb-12">
                <button onClick={handleAdd} className="rounded bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-11">
                  + Adicionar Cliente
                </button>
              </div>

              <div className="mx-6 mb-12">
                <button onClick={loadCustomers} className="rounded bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-11">
                  🗘Atualizar Lista
                </button>
              </div>

            </div>
        </div>


        <div className="mx-6 mb-12">
          {customers.length ? (
          <table className="border border-gray-300">
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
              <CustomerItem key={customer.id} customer={customer} onUpdate={loadCustomers} />
            ))}
            </tbody>
          </table>
          ) : (
            <div className="grid grid-cols-1 mb-12">
            <h1 className="text-slate-600 py-6 text-3xl text-center ">Nenhum Cliente Cadastrado.</h1>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomersPage;