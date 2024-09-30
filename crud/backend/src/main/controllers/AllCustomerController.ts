import { Request, Response } from 'express';

// Simulando um banco de dados com um array
const customers = [
  { id: 1, name: 'Cliente A' },
  { id: 2, name: 'Cliente B' },
  { id: 3, name: 'Cliente C' },
];

// Controller para listar todos os clientes
class AllCustomerController {
  public handle(req: Request, res: Response) {
    res.json(customers);
  }
}

export default new AllCustomerController();
