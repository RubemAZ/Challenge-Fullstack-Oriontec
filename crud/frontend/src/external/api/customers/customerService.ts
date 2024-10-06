import api from '@/src/adapters/http/api'

export async function fetchCustomers(): Promise<any> {
    const response = await api.get('/customers');
    if (response.status >= 400) {
      throw new Error('Erro ao buscar clientes');
    }

    return response.data;
  }
  
  export async function createCustomer(customer: { name: string; email: string; document: string }): Promise<void> {
    const response = await api.post('/customers', customer);
  
    console.log(response)
    if (response.status >= 400) {
      throw new Error('Falha ao cadastrar cliente')
    }
  }
  