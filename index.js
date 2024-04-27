import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import pg from "pg";
import WebSocket, { WebSocketServer } from "ws";
import { query } from "./db.js";

dotenv.config();
//This creates express application
const app = express();
// This creates the http server to serve the express application
const server = createServer(app);

// This below line helps us to create the webSocketServer
const wss = new WebSocketServer({ server });
const { Pool } = pg;

wss.on("connection", function connection(ws) {
	ws.on("message", function message(data, isBinary) {
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});
});

app.get("/", async (req, res) => {
	res.send("This is entry point");
});

app.get("/getData", async (req, res) => {
	try {
		const result = await query("SELECT * FROM public.users");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internel Server Error");
	}
});

app.post("/createUser", async (req, res) => {});

server.listen(3001, () => {
	console.log("Application started");
});
