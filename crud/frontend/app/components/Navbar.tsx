import React, { useState } from 'react'


const Navbar = () => {
  return (
    <div className="fixed max-w-full top-0 left-0 w-full z-50 bg-zinc-200 shadow-lg">
      <nav className="mx-12 p-4 flex justify-between items-center">
          <a href="https://www.oriontec.com.br/">
            <img src="/img/logo-oriontec.webp" alt="Logo" />
          </a>

          <h1 className="text-slate-600 text-2xl ">
            CRUD Web Fullstack
          </h1>
      </nav>
    </div>
  );
};

export default Navbar;