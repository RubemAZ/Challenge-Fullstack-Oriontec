export interface CustomerData {
  id: number;
  name: string;
  email: string;
  document: string;
}

class CustomerPresenter {
  static present(data: unknown): CustomerData {
    const customer = data as { ID: number; NAME: string; EMAIL: string; DOCUMENT: string };
    return {
      id: customer.ID,
      name: customer.NAME,
      email: customer.EMAIL,
      document: customer.DOCUMENT,
    };
  }
}

export default CustomerPresenter;