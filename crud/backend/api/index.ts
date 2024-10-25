
import express from 'express';
import ExpressHttpServer from '../src/external/web/express/expresshttpserver';

const app = express();
const server = new ExpressHttpServer();

// Função que será exportada e executada pelo Vercel
export default server['app'];



