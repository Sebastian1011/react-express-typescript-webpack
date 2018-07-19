import { resolve } from 'path';
import express, { Request, Response, Express } from 'express';
import compression from 'compression';

const clientBuildPath = resolve(__dirname, '..', '..', 'client');

const prodSetup: Function = function setup(app: Express) {
    app.use(compression());
    app.use('/', express.static(clientBuildPath));

    // all other requests be handled by UI itself
    app.get('*', (req: Request, res: Response) => res.sendFile(resolve(clientBuildPath, 'index.html')));
};

export default prodSetup;
