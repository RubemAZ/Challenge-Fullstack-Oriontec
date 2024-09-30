"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const AllCustomerController_1 = __importDefault(require("../../../main/controllers/AllCustomerController"));
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
