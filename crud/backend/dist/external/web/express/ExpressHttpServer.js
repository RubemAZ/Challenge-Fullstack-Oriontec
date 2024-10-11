"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const customerRoutes_1 = __importDefault(require("../../../main/routes/customerRoutes"));
class ExpressHttpServer {
    constructor() {
        this.app = (0, express_1.default)();
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
        this.app.use('/api', customerRoutes_1.default);
    }
    getApp() {
        return this.app;
    }
}
// Ao invés de iniciar o servidor com listen(), exportamos a instância do app
const server = new ExpressHttpServer();
exports.default = server.getApp();
