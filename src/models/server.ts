import express, { Express } from 'express';
import cors from 'cors';

import { ENV } from '../config/env';
import usersRouter from '../routes/users';
import foldersRouter from '../routes/folders';

export class Server {
    private app: Express;
    private port: number;
    constructor() {
        this.app = express();
        this.port = ENV.SERVER_PORT;
        
        this.applyMiddleware();
        this.routes();
    }

    applyMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes () {
        this.app.get('/', (req, res) => {
            res.send('Hello World! :)');
        }); 

        this.app.use('/users', usersRouter);
        this.app.use('/folders', foldersRouter);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }
}