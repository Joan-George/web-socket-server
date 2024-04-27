import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	database: process.env.DATABASE,
});

export const query = (text, params) => pool.query(text, params);
