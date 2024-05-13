import { verifyJWT } from "../jwt.js";

export const authentication = (req, res, next) => {
	if (!req.cookies.token) return res.status(403).json({ message: "Unauthorized Request" });
	console.log({ token: req.cookies.token });
	const decoded = verifyJWT({ token: req.cookies.token });

	if (!decoded) {
		return res.status(401).json({ message: "Invalid token" });
	}

	req.userData = decoded;
	next();
};
