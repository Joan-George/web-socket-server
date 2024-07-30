import { Request, Response } from "express";
import { query } from "../db";

const getAll = async (req: Request, res: Response) => {
	const result = await query(
		"SELECT groups.* FROM public.groups groups LEFT JOIN public.user_group pug on pug.group_id = groups.id AND user_id = $1",
		[req.userData.id]
	);
	res.json(result.rows);
};

const get = async (req: Request, res: Response) => {
	const result = await query(
		"SELECT * FROM public.groups groups JOIN public.user_group pug on pug.group_id = groups.id AND user_id = $1 WHERE groups.id = $2",
		[req.userData.id, req.params.id]
	);
	res.json(result.rows);
};

const create = async (req: Request, res: Response) => {
	const result = await query("INSERT INTO public.groups (name,created_by_id,created_at) VALUES ($1,$2,NOW()) RETURNING *", [
		req.body.name,
		req.userData.id,
	]);

	await query("INSERT INTO public.user_group (group_id,user_id) VALUES ($1,$2)", [result.rows[0].id, req.userData.id]);

	res.json({ create: result.rows });
};

const update = (req: Request, res: Response) => {
	res.json({ update: "chat room updated" });
};

const remove = async (req: Request, res: Response) => {
	res.json({ delete: "chat room deleted" });
};

export { create, get, getAll, remove, update };
