
import express from 'express';
import { ExpressHttpServer } from '../src/external/web/express/ExpressHttpServer';

const app = express();
const server = new ExpressHttpServer(app);

// Função que será exportada e executada pelo Vercel
export default server.getApp();
