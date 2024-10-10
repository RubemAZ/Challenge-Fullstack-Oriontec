import React, { useState } from 'react';

interface CustomerSectionProps {
    onSearch: (query: string) => void
    onCustomerAdded: () => void
  }     
const CustomerSection:React.FC<CustomerSectionProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
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