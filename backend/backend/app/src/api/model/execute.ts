import pool from "./pgPoolConfig.js";

export async function execute(query: string, args: any[]) {
    const   client = await pool.connect();

    const res = client.query(query, args);

    client.release()
    return (res);
}