import pgp from 'pg-promise';
import env from '../config/env';

const dbConfig = {
  host: 'localhost',
  port: Number(env.POSTGRES_PORT),
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
};
const pgpInstance = pgp();
const db = pgpInstance(dbConfig);

export { db, pgpInstance };
