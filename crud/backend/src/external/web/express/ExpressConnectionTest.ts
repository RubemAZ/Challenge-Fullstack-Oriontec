import express from 'express';
import FirebirdConnection from '../../db/firebird/FirebirdConnection';  
const app = express();
const port = 3000;

app.get('/test-connection', async (req, res) => {
    try {
        const db = await FirebirdConnection.getConnection(); // Obtem a conexão com o banco de dados
        db.query('SELECT 1 FROM RDB$DATABASE', [], (err: Error | null, result: any) => {
            if (err) {
                res.status(500).send('Error executing query');
                return;
            }
            res.send('Connection successful: ' + JSON.stringify(result));
            db.detach(); // Certifique-se de fechar a conexão quando terminar
        });
    } catch (err) {
        res.status(500).send('Error connecting to database: ' + err);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
