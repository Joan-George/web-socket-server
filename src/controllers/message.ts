import { Request, Response } from "express";
import { query } from "../db";

const getAll = async (req: Request, res: Response) => {
	res.json({ getAll: "messages" });
};

const get = async (req: Request, res: Response) => {
	const result = await query("SELECT * FROM public.messages where room_id = $1", [req.params.id]);
	res.json(result.rows);
};

const create = async (req: Request, res: Response) => {
	console.log({ body: req?.body, userData: req?.userData });
	const result = await query("insert into public.messages (room_id, sender_id, message_content) values ($1,$2,$3)", [
		req.body.room_id,
		req.userData.id,
		req.body.message,
	]);
	res.json({ create: result.rows });
};

const update = (req: Request, res: Response) => {
	res.json({ update: "chat room updated" });
};

const remove = (req: Request, res: Response) => {
	res.json({ delete: "chat room deleted" });
};

export { create, get, getAll, remove, update };
