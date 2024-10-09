"use client";
import React from 'react';
import CustomerPage from "./customers/page"

const App = () => {
  
  return (
    <div className="">
      <CustomerPage 
        onSearch={(query) => {/* Implement search logic */}}
        onCustomerAdded={() => {/* Handle customer added */}}
      />
    </div>
  );
};

export default App;