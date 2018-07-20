// API
import express, { Request, Response, Express } from 'express';
import { logger } from '../logger';
import { Todo } from '../model/todo';

const todo_list: Todo[] = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }];

export default function setup(app: Express) {
    app.get('/api/todo', (req: Request, res: Response) => {
        res.json({
            rtn: 0,
            message: 'ok',
            todo_list
        });
    });
    app.post('/api/todo', (req: Request, res: Response) => {
        let id: number = 0;
        if (todo_list.length > 0) id = todo_list[todo_list.length - 1].id + 1;
        todo_list.push({ id, name: req.body.name || '' });
        res.json({
            rtn: 0,
            message: 'ok',
            id
        });
    });

    app.delete('/api/todo/:id', (req: Request, res: Response) => {
        logger.info(req.params);
        for (let i = 0; i < todo_list.length; i++) {
            const todo = todo_list[i];
            if (todo.id === parseInt(req.params.id)) {
                todo_list.splice(i, 1);
            }
        }
        res.json({
            rtn: 0,
            message: 'ok'
        });
    });

    app.put('/api/todo/:id', (req: Request, res: Response) => {
        for (let i = 0; i < todo_list.length; i++) {
            const todo = todo_list[i];
            if (todo.id === parseInt(req.params.id)) {
                todo.name = req.body.name;
            }
        }
        res.json({
            rtn: 0,
            message: 'ok'
        });
    });
}
