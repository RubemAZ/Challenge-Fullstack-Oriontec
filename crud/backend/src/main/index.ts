import ExpressHttpServer from '../external/web/express/ExpressHttpServer';

const server = new ExpressHttpServer(3001);
server.start();