import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { logger, loggerMiddleware } from './logger';
import setupApiRoutes from './middlewares/api';
import devSetup from './middlewares/development';
import prodSetup from './middlewares/production';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HTTP_PORT = process.env.HTTP_PORT || '9900';

function onUnhandledError(err: Error) {
    try {
        logger.error(err);
    } catch (e) {
        console.log('LOGGER ERROR:', e); //eslint-disable-line no-console
        console.log('APPLICATION ERROR:', err); //eslint-disable-line no-console
    }
    process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const setupAppRoutes = process.env.NODE_ENV === 'development' ? devSetup : prodSetup;

const app = express();

app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use(loggerMiddleware);
app.use(bodyParser.json());

// application routes
setupApiRoutes(app);
setupAppRoutes(app);

http.createServer(app).listen(process.env.HTTP_PORT, () => {
    logger.info(`HTTP server is now running on http://localhost:${process.env.HTTP_PORT}`);
});
