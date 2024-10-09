import React, { useState } from 'react'


const Navbar = () => {
  return (
    <div className="fixed max-w-full w-full bg-slate-200">
      <nav className="mx-12 p-4 flex justify-between items-center">
        <div className="mx-2">
          <img src="/img/logo-oriontec.webp" alt="Logo" />
        </div>

        <div>
          <h1 className="text-2xl font-thin">
            Sistema de Gerenciamento de Clientes
          </h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;