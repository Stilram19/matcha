import pg from 'pg';
import dotenv from 'dotenv'

const { Pool } = pg;

dotenv.config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    max: 10,
});

export default pool;