export interface CustomerData {
    id: number;
    name: string;
    email: string;
    document: string;
  }
  
  class CustomerPresenter {
    static present(data: any): CustomerData {
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        document: data.document,
      };
    }
  }
  
  export default CustomerPresenter;
  