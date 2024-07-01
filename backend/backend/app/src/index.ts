import express from 'express'
import dotenv from 'dotenv'
import routes from './api/routers/index.js'

dotenv.config();

const app = express();
const API_PORT = process.env.API_PORT;

app.listen(API_PORT, () => {
    console.log(`server listening on port ${API_PORT}`);
});

app.use(express.json());
app.use(routes);