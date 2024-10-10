"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FirebirdConnection_1 = __importDefault(require("../../db/firebird/FirebirdConnection"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/test-connection', async (req, res) => {
    try {
        const db = await FirebirdConnection_1.default.getConnection(); // Obtem a conexão com o banco de dados
        db.query('SELECT 1 FROM RDB$DATABASE', [], (err, result) => {
            if (err) {
                res.status(500).send('Error executing query');
                return;
            }
            res.send('Connection successful: ' + JSON.stringify(result));
            db.detach(); // Certifique-se de fechar a conexão quando terminar
        });
    }
    catch (err) {
        res.status(500).send('Error connecting to database: ' + err);
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
