import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

interface PoolConfig {
	user: string;
	password: string;
	host: string;
	port: number;
	database: string;
}

const pool = new Pool({
	user: process.env.DATABASE_USER!,
	password: process.env.DATABASE_PASSWORD!,
	host: process.env.DATABASE_HOST!,
	port: Number(process.env.DATABASE_PORT), // Consider nullish coalescing
	database: process.env.DATABASE!,
} as PoolConfig);

export const query = (text: string, params: any) => pool.query(text, params);
