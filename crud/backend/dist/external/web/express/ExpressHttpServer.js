"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const AllCustomerController_1 = __importDefault(require("../../../main/controllers/AllCustomerController"));
const FirebirdConnection_1 = __importDefault(require("../../../external/db/firebird/FirebirdConnection"));
class ExpressHttpServer {
    constructor(port = 3000) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.setupMiddleware();
        this.setupRoutes();
    }
    setupMiddleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    setupRoutes() {
        this.app.get('/health', (req, res) => {
            res.status(200).send({ status: 'Server is running!' });
        });
        // Rota para listar todas as pessoas
        this.app.get('/api/customers', (req, res) => {
            AllCustomerController_1.default.handle(req, res); // Chama o controller
        });
        // Rota para testar a conexão com o banco de dados
        this.app.get('/api/test-connection', async (req, res) => {
            try {
                await FirebirdConnection_1.default.getConnection(); // Testa a conexão
                res.status(200).send({ message: 'Conexão bem-sucedida!' });
            }
            catch (error) {
                // Ajuste para lidar com o erro
                const errorMessage = (error instanceof Error) ? error.message : 'Erro desconhecido';
                res.status(500).send({ error: errorMessage });
            }
        });
        // Outras rotas para adicionar, editar e deletar clientes
        // ...
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.default = ExpressHttpServer;
