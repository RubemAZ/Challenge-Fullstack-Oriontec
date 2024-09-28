import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold mt-10">Bem-vindo ao Sistema de Gerenciamento de Clientes</h1>
      <p className="mt-5">Utilize as opções abaixo para navegar no sistema.</p>

      <div className="mt-10">
        <Link href="/customers" className="text-blue-500 underline">
          Ver Lista de Clientes
        </Link>
      </div>

      <div className="mt-4">
        <Link href="/customers/new" className="text-blue-500 underline">
          Cadastrar Novo Cliente
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
