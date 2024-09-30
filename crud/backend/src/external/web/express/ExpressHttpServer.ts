import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AllCustomerController from '../../../main/controllers/AllCustomerController';


class ExpressHttpServer {
  private app: express.Application;
  private port: number;

  constructor(port: number = 3000) {
    this.app = express();
    this.port = port;

    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).send({ status: 'Server is running!' });
    });

    // Rota para listar todas as pessoas
    this.app.get('/api/customers', (req: Request, res: Response) => {
      AllCustomerController.handle(req, res); // Chama o controller
    });

    // Outras rotas para adicionar, editar e deletar clientes
    // ...
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default ExpressHttpServer;
