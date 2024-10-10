import ExpressHttpServer from '../external/web/express/ExpressHttpServer';

require('dotenv').config();


const server = new ExpressHttpServer(3001);
server.start();