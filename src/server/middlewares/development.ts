import { resolve } from 'path';
import { Request, Response, Express } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import log from 'loglevel';

const webpackConfig = require('../../../config/webpack.config.dev');

const compiler = webpack(webpackConfig);

const devSetup: Function = function setup(app: Express) {
    app.use(
        webpackDevMiddleware(compiler, {
            logger: log.getLogger('dev-log'),
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true
            }
        })
    );

    app.use(webpackHotMiddleware(compiler));

    // all other requests be handled by UI itself
    app.get('*', (req: Request, res: Response) =>
        res.sendFile(resolve(__dirname, '..', '..', '..', 'build-dev', 'client', 'index.html'))
    );
};

export default devSetup;
