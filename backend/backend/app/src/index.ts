import express from 'express'
import dotenv from 'dotenv'
import routes from './api/routers/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import passport from 'passport'
import { setupOauth } from './api/middlewares/oauthSetup.js'

dotenv.config();

const app = express();
const API_PORT = process.env.API_PORT;

app.use(cors({ 
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    
}));

app.listen(API_PORT, () => {
    console.log(`server listening on port ${API_PORT}`);
});

const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(uploadDir));

setupOauth(passport);
app.use(passport.initialize());

app.use(routes);