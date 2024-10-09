"use client";
import React, { useState } from 'react';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  const [searchQuery, setSearchQuery] = useState(''); // Armazena a query de pesquisa

  return (
    <html lang="pt-BR">
      <head>
        <meta name="description" content="Aplicação para gerenciar registros de clientes." />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-300 text-gray-900">
        <Navbar/>
        <main className="container mx-auto pt-10 flex-grow">
          {React.cloneElement(children as React.ReactElement<any>, { searchQuery })}
        </main>
        <footer className="p-4 bg-gray-800 text-white text-center mt-10">
          <p>© 2024 Oriontec Desafio FullStack Sistema de Gerenciamento de Clientes</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;