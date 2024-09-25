import express from 'express';
import { SERVER_PORT } from './config';

const app = express();
const port = SERVER_PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});