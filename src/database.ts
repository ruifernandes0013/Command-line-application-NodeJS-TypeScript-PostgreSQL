import { Client } from 'pg'
import env from './env';

const db = new Client({
    host: 'localhost',
    port: Number(env.POSTGRES_PORT),
    database: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
})

db.connect()

export { db };
