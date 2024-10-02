import express, { Request, Response } from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import customerRoutes from '../../../main/routes/customerRoutes';

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

    // Rotas para operações de clientes
    this.app.use('/api', customerRoutes); // Integra as rotas de clientes

    // Outras rotas, se necessário, podem ser adicionadas aqui...
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

// Inicializando o servidor
const server = new ExpressHttpServer();
server.start(); // Isso deve iniciar o servidor

export default ExpressHttpServer;  
