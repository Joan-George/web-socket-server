import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { query } from "./db.js";
import { signJWT } from "./jwt.js";
import { authentication } from "./middleware/authMiddleware.js";
import { chatRoute } from "./routes/chat_rooms.js";

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
app.use(cookieParser());

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

app.use("/chatroom", chatRoute);

app.get("/", async (req, res) => {
	res.send("This is entry point");
});

app.get("/getData", authentication, async (req, res) => {
	console.log({ req: req.userData });
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

	const result = await query("SELECT id,username,email FROM public.users where email = $1 and password = $2", [
		req.body.email,
		req.body.password,
	]);
	if (result.rows.length === 0) {
		return res.status(401).json({ staus: "Unauthorized" });
	}
	const token = signJWT({ data: result.rows[0] });

	res.setHeader("Set-Cookie", `token=${token}; Path=/; Secure; HttpOnly`);
	res.status(200).json({ status: "Success" });
});

app.listen(3001, () => {
	console.log("Application started");
});
