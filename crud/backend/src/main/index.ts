import ExpressHttpServer from '../external/web/express/ExpressHttpServer';

const server = new ExpressHttpServer(3000); // Define a porta (padrão 3000)
server.start();