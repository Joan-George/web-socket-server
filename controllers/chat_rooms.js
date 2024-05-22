const getAll = (req, res) => {
	res.json({ all: "all chat room" });
};

const get = (req, res) => {
	res.json({ one: "only one chat room" });
};

const create = (req, res) => {
	res.json({ create: "chat room created" });
};

const update = (req, res) => {
	res.json({ update: "chat room updated" });
};

const remove = (req, res) => {
	res.json({ delete: "chat room deleted" });
};

export { create, get, getAll, remove, update };
