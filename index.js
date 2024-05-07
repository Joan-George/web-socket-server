import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { query } from "./db.js";

dotenv.config();
//This creates express application
const app = express();
// This creates the http server to serve the express application
// const server = createServer(app);

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true, // Replace with your React app's origin
	})
);

app.use(express.json());

// This below line helps us to create the webSocketServer
// const wss = new WebSocketServer({ server });
// const { Pool } = pg;

// wss.on("connection", function connection(ws) {
// 	ws.on("message", function message(data, isBinary) {
// 		wss.clients.forEach(function each(client) {
// 			if (client.readyState === WebSocket.OPEN) {
// 				client.send(data, { binary: isBinary });
// 			}
// 		});
// 	});
// });

app.get("/", async (req, res) => {
	res.send("This is entry point");
});

app.get("/getData", async (req, res) => {
	try {
		const result = await query("SELECT * FROM public.users");
		res.setHeader("hello", "test");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internel Server Error");
	}
});

app.post("/createUser", async (req, res) => {});

app.post("/login", async (req, res) => {
	console.log({ body: req.body });

	const result = await query("SELECT * FROM public.users where email = $1 and password = $2", [req.body.email, req.body.password]);
	if (result.rows.length === 0) {
		res.status(401).json({ staus: "Unauthorized" });
		return;
	}
	const userData = { name: "John Doe" }; // Example user data
	const serializedData = JSON.stringify(userData);
	const encodedData = Buffer.from(serializedData).toString("base64");

	res.setHeader("Set-Cookie", `userData=${encodedData}; Path=/; Secure; HttpOnly`);
	res.status(200).json({ status: "Success" });
});

app.listen(3001, () => {
	console.log("Application started");
});
