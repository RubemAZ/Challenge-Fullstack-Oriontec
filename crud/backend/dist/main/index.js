"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressHttpServer_1 = require("../external/web/express/ExpressHttpServer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Instância do servidor
const app = new ExpressHttpServer_1.ExpressHttpServer().getApp();
// Função que será exportada e executada pelo Vercel
exports.default = app;
