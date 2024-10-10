"use client";
import React from 'react';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="description" content="Aplicação para gerenciar registros de clientes." />
      </head>
      <body className="bg-zinc-300 text-zinc-900">
        <Navbar/>
        <main className="container mx-auto flex-grow">
          {React.cloneElement(children as React.ReactElement<any>, { })}
        </main>
        <footer className="p-4 bg-zinc-800 text-white text-center fixed bottom-0 left-0 w-full z-50 mt-10">
          <p>© 2024 Oriontec CRUD Web FullStack - Sistema de Gerenciamento de Clientes</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;