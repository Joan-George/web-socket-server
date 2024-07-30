import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { Sequelize } from "sequelize";
// import { dev } from "./config/config";
import { createServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { query } from "./db";
import { signJWT } from "./jwt";
import { authentication } from "./middleware/authMiddleware";
import { chatRoute } from "./routes/groups";
import { messageRoute } from "./routes/message";

const { development } = require("./config/config.js");

//This creates express application
const app = express();
// This creates the http server to serve the express application
const server = createServer(app);

// Initialize Sequelize
const sequelize = new Sequelize(development.database, development.username, development.password, {
	host: development.host,
	dialect: "postgres",
});

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true, // Replace with your React app's origin
	})
);

app.use(express.json());
app.use(cookieParser());

// This below line helps us to create the webSocketServer
const wss = new WebSocketServer({ server });
// const { Pool } = pg;

wss.on("connection", function connection(ws: WebSocket) {
	ws.on("message", function message(data: any, isBinary: any) {
		console.log({ websocketCheck: data });
		wss.clients.forEach(function each(client: any) {
			if (client.readyState === WebSocket.OPEN) {
				client.send("websocket success", { binary: isBinary });
			}
		});
	});
});

app.use("/group", authentication, chatRoute);
app.use("/message", authentication, messageRoute);

app.get("/", async (req: Request, res: Response) => {
	res.send("This is entry point");
});

app.get("/getData", authentication, async (req: Request, res: Response) => {
	try {
		const result = await query("SELECT * FROM public.users", []);
		res.setHeader("hello", "test");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

app.post("/login", async (req: Request, res: Response) => {
	const result = await query("SELECT id,name,email FROM public.users where email = $1 and password = $2", [
		req.body.email,
		req.body.password,
	]);
	if (result.rows.length === 0) {
		return res.status(401).json({ status: "Unauthorized" });
	}
	const token = signJWT({ data: result.rows[0] });

	res.setHeader("Set-Cookie", `token=${token}; Path=/; Secure; HttpOnly`);
	res.status(200).json({ status: "Success" });
});

server.listen(3001, () => {
	console.log("Application started");
});

// server.on("upgrade", function upgrade(request, socket, head) {
// 	// const { pathname } = new URL(request.url as string, "ws://localhost:3001");
// 	console.log("upgrade");
// 	wss.handleUpgrade(request, socket, head, (socket) => {
// 		wss.emit("connection", socket, request);
// 	});
// 	// if (pathname === "/message") {
// 	// 	wss.handleUpgrade(request, socket, head, (ws) => {
// 	// 		wss.emit("connection", ws, request);
// 	// 	});
// 	// }
// 	// else if (pathname === "/bar") {
// 	// 	wss.handleUpgrade(request, socket, head, function done(ws) {
// 	// 		wss.emit("connection", ws, request);
// 	// 	});
// 	// }
// 	// else {
// 	// 	socket.destroy();
// 	// }
// });
