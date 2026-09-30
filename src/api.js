import 'dotenv/config.js';
import cors from 'cors';
import express from 'express';

import AddRotas from './routes.js'

const api = express();
api.use(cors())
api.use(express.json());
AddRotas(api);


const porta = process.env.port;
api.listen(porta, () => console.log("A API subiu com sucesso na porta: " + porta));