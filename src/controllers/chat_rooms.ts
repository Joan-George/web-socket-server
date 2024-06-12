import { Request, Response } from "express";
import { query } from "../db";

const getAll = async (req: Request, res: Response) => {
	const result = await query("SELECT * FROM public.chat_rooms cr JOIN public.user_chatroom pucr on pucr.room_id = cr.id AND user_id = $1", [
		req.userData.id,
	]);
	res.json(result.rows);
};

const get = async (req: Request, res: Response) => {
	const result = await query(
		"SELECT * FROM public.chat_rooms cr JOIN public.user_chatroom pucr on pucr.room_id = cr.id AND user_id = $1 WHERE cr.id = $2",
		[req.userData.id, req.params.id]
	);
	res.json(result.rows);
};

const create = async (req: Request, res: Response) => {
	console.log({ body: req?.body, userData: req?.userData });
	const result = await query("INSERT INTO public.chat_rooms (room_name,created_by_id,created_at) VALUES ($1,$2,NOW()) RETURNING *", [
		req.body.group_name,
		req.userData.id,
	]);
	console.log({ result });

	await query("INSERT INTO public.user_chatroom (room_id,user_id) VALUES ($1,$2)", [result.rows[0].id, req.userData.id]);

	res.json({ create: result.rows });
};

const update = (req: Request, res: Response) => {
	res.json({ update: "chat room updated" });
};

const remove = async (req: Request, res: Response) => {
	res.json({ delete: "chat room deleted" });
};

export { create, get, getAll, remove, update };
