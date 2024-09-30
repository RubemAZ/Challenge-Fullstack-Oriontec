"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressHttpServer_1 = __importDefault(require("../external/web/express/ExpressHttpServer"));
const server = new ExpressHttpServer_1.default(3000); // Define a porta (padrão 3000)
server.start();
