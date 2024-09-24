import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

class ExpressHttpServer {
    private app: express.Application;
    private port: number;

    constructor(port: number = 3000) {
        this.app = express();
        this.port = port;

        this.setupMiddleware();
        this.setupRoutes();
    }

    // Configura middlewares globais
    private setupMiddleware(): void {
        this.app.use(cors()); // Permitir requisições de qualquer origem (ajuste conforme necessário)
        this.app.use(bodyParser.json()); // Lidar com requisições JSON
        this.app.use(bodyParser.urlencoded({ extended: true })); // Lidar com requisições URL-encoded
    }

    // Configura rotas iniciais
    private setupRoutes(): void {
        this.app.get('/health', (req: Request, res: Response) => {
            res.status(200).send({ status: 'Server is running!' });
        });

                // Rota para listar todas as pessoas
        this.app.get('/customers', (req: Request, res: Response) => {
            // Conectar ao controller correspondente
            allCustomerController.handle(req, res);
        });

        // Rota para inserir nova pessoa
        this.app.post('/customers', (req: Request, res: Response) => {
            registerCustomerController.handle(req, res);
        });

        this.app.post('/customers', (req, res) => {
            // Instanciar e chamar RegisterCustomerController
          });
          
          this.app.get('/customers', (req, res) => {
            // Instanciar e chamar AllCustomerController
          });
          
          this.app.get('/customers/:id', (req, res) => {
            // Instanciar e chamar CustomerByIdController
          });
          
          this.app.put('/customers/:id', (req, res) => {
            // Instanciar e chamar AlterCustomerController
          });
          
          this.app.delete('/customers/:id', (req, res) => {
            // Instanciar e chamar DeleteCustomerController
          });
          

    // Outras rotas (editar, deletar, etc)

        // Aqui você pode adicionar outras rotas do seu CRUD
        // Exemplo:
        // this.app.use('/customers', customerRouter);
    }

    // Método para iniciar o servidor
    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    // Método para parar o servidor (se necessário)
    public stop(): void {
        // Lógica para parar o servidor (caso implemente)
    }
}

export default ExpressHttpServer;