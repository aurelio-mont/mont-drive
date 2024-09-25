import express, { Express } from 'express';
import cors from 'cors';

import { SERVER_PORT } from '../config';

export class Server {
    private app: Express;
    private port: number;
    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        
        this.applyMiddleware();
        this.routes();
    }

    applyMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes () {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        }); 
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }
}