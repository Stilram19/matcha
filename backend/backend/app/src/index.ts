import express from 'express'
import dotenv from 'dotenv'
import routes from './api/routers/index.js'
import cors from 'cors'
import createIoServer from './api/gateway/index.js';

dotenv.config();

const app = express();
const API_PORT = process.env.API_PORT;

app.use(cors({ 
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}));

createIoServer(app);

app.listen(API_PORT, () => {
    console.log(`server listening on port ${API_PORT}`);
});

app.use(express.json());
app.use(routes);