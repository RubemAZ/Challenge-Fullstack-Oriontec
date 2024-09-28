import './globals.css';  // Arquivo global de estilos
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="pt-BR">
      <head>
        <title>Sistema de Gerenciamento de Clientes</title>
        <meta name="description" content="Aplicação para gerenciar registros de clientes." />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <header className="p-4 bg-blue-500 text-white text-center">
          <h1 className="text-3xl font-bold">Sistema de Gerenciamento de Clientes</h1>
        </header>

        <main className="container mx-auto py-10">
          {children}  {/* Este children renderiza o conteúdo das páginas */}
        </main>

        <footer className="p-4 bg-gray-800 text-white text-center mt-10">
          <p>© 2024 Sistema de Gerenciamento de Clientes</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
