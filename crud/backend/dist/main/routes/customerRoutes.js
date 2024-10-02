"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = __importDefault(require("../controllers/customerController"));
const router = (0, express_1.Router)();
// Rota para adicionar um novo cliente
router.post('/customers', (req, res) => customerController_1.default.add(req, res));
// Rota para listar todos os clientes
router.get('/customers', (req, res) => customerController_1.default.getAll(req, res));
// Rota para atualizar um cliente pelo ID
router.put('/customers/:id', (req, res) => customerController_1.default.update(req, res));
// Rota para deletar um cliente pelo ID
router.delete('/customers/:id', (req, res) => customerController_1.default.delete(req, res));
exports.default = router;
