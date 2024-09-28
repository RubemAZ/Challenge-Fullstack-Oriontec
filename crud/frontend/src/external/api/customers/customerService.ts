// customerService.ts
export async function fetchCustomers() {
    const response = await fetch('/api/customers');
    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }
    return response.json();
  }
  
  export async function createCustomer(customer: { name: string; email: string; document: string }) {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao criar cliente');
    }
  
    return response.json();
  }
  