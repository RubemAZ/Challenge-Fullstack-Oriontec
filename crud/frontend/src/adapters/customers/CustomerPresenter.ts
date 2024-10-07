export interface CustomerData {
    id: number;
    name: string;
    email: string;
    document: string;
  }
  
  class CustomerPresenter {
    static present(data: any): CustomerData {
      return {
        id: data.ID,
        name: data.NAME,
        email: data.EMAIL,
        document: data.DOCUMENT,
      };
    }
  }
  
  export default CustomerPresenter;
  