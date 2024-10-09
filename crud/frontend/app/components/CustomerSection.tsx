import React, { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface CustomerSectionProps {
    onSearch: (query: string) => void
    onCustomerAdded: () => void
  }     


  /*const CustomersPageList = ({ searchQuery }: { searchQuery: string }) => {
    /*const [customers, setCustomers] = useState<any[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  
    // Função para buscar clientes no backend
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/customers');
        if (!response.ok) {
          throw new Error('Erro ao buscar clientes');
        }
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data); // Inicialmente, todos os clientes são exibidos
      } catch (error) {
        console.error(error);
      }
    };
  
    // Função chamada quando o campo de busca é alterado
    useEffect(() => {
      const filtered = customers.filter((customer) =>
        customer.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCustomers(filtered); // Atualiza os clientes filtrados com base na busca
    }, [searchQuery, customers]); // Reexecuta o filtro sempre que a query de busca ou lista de clientes mudar
  
    useEffect(() => {
      fetchCustomers();
    }, []);
    So comentar pq podemos aproveitar este trecho depois
    */
const CustomerSection:React.FC<CustomerSectionProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const MySwal = withReactContent(Swal);
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      onSearch(e.target.value);
    };


    return (
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 mb-4">
            <h1 className="text-2xl font-bold text-center">Lista de Clientes</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">

        <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Pesquisar cliente..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 rounded border border-gray-300"
                />
            </div>

            <button className="bg-green-500 text-white p-2 rounded">
                Adicionar Cliente
            </button>
        </div>
        </div>
    );
};

export default CustomerSection;