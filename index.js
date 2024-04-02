import express from "express";
import { createServer } from "http";
import pg from "pg";
import { WebSocketServer } from "ws";

//This creates express application
const app = express();
// This creates the http server to serve the express application
const server = createServer(app);

// This below line helps us to create the webSocketServer
const wss = new WebSocketServer({ server });
const { Pool } = pg;

app.get("/", async (req, res) => {
	res.send("This is entry point");
});

app.get("/getData", async (req, res) => {
	const pool = new Pool({ user: "postgres", host: "127.0.0.1", database: "socket_example", password: "root", port: 5432 });
	pool.connect();
	try {
		const result = await pool.query("SELECT * FROM messages");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

server.listen(3001, () => {
	console.log("Application started");
});
