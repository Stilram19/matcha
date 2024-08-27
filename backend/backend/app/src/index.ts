import express from 'express'
import dotenv from 'dotenv'
import routes from './api/routers/index.js'
import cors from 'cors'
import createIoServer from './api/gateway/index.js';
import cookieParser from 'cookie-parser'
import fs from 'fs'
import passport from 'passport'
import { setupOauth } from './api/middlewares/oauthSetup.js'

dotenv.config();

const app = express();
console.log(process.env.API_PORT);
const API_PORT = process.env.API_PORT || 3000;

app.use(cors({ 
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

setupOauth(passport);
app.use(passport.initialize());

app.use(routes);

const http_server = app.listen(API_PORT, () => {
    console.log(`server listening on port ${API_PORT}`);
});

createIoServer(http_server);