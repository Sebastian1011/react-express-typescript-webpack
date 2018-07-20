// API
import express, { Request, Response, Express } from 'express';

const servers = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }];

export default function setup(app: Express) {
    app.get('/api/stats', (req: Request, res: Response) => {
        setTimeout(() => {
            res.json({
                rtn: 0,
                message: 'ok',
                servers
            });
        }, 100);
    });

    app.post('/api/servers', (req: Request, res: Response) => {
        if (!req.body.name) {
            return res.json({
                error: 'cannot add server with empty name'
            });
        }
        return setTimeout(() => {
            servers.push({
                id: servers[servers.length - 1].id + 1,
                name: req.body.name
            });
            res.json({
                success: true
            });
        }, 500);
    });
}
