import { query } from "../db.js";

const getAll = (req, res) => {
	res.json({ all: "all chat room" });
};

const get = (req, res) => {
	res.json({ one: "only one chat room" });
};

const create = async (req, res) => {
	console.log({ body: req?.body, userData: req?.userData });
	const result = await query("INSERT INTO public.chat_rooms (room_name,created_by_id,created_at) VALUES ($1,$2,NOW()) RETURNING *", [
		req.body.group_name,
		req.userData.id,
	]);
	console.log({ result });

	res.json({ create: result.rows });
};

const update = (req, res) => {
	res.json({ update: "chat room updated" });
};

const remove = (req, res) => {
	res.json({ delete: "chat room deleted" });
};

export { create, get, getAll, remove, update };
