import api from '@/src/adapters/http/api';

export async function fetchCustomers(): Promise<any> {
    const response = await api.get('/customers');
    if (response.status >= 400) {
      throw new Error('Erro ao buscar clientes.');
    }

    return response.data;
}

export async function createCustomer(customer: { name: string; email: string; document: string }): Promise<void> {
    const response = await api.post('/customers', customer);
    if (response.status >= 400) {
      throw new Error('Falha ao cadastrar cliente.');
    }
}

export async function editCustomer(id: number, customer: { name: string; email: string; document: string }): Promise<void> {
    const response = await api.put(`/customers/${id}`, customer);
    if (response.status >= 400) {
      throw new Error('Falha ao atualizar cliente.');
    }
}

export async function removeCustomer(id: number): Promise<void> {
    const response = await api.delete(`/customers/${id}`);
    if (response.status >= 400) {
      throw new Error('Falha ao deletar cliente.');
    }
}
