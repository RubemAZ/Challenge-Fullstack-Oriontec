import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AllCustomerController from '../../../main/controllers/AllCustomerController';
import FirebirdConnection from '../../../external/db/firebird/FirebirdConnection';

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

        // Rota para testar a conexão com o banco de dados
        this.app.get('/api/test-connection', async (req: Request, res: Response) => {
            try {
                await FirebirdConnection.getConnection(); // Testa a conexão
                res.status(200).send({ message: 'Conexão bem-sucedida!' });
            } catch (error) {
                // Ajuste para lidar com o erro
                const errorMessage = (error instanceof Error) ? error.message : 'Erro desconhecido';
                res.status(500).send({ error: errorMessage });
            }
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