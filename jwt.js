import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";
export const signJWT = ({ data }) => {
	console.log(process.env.JWT_PRIVATE_KEY);
	return jsonwebtoken.sign(data, process.env.JWT_PRIVATE_KEY, { algorithm: "RS256", expiresIn: "1h" });
};

export const verifyJWT = ({ token }) => {
	return jsonwebtoken.verify(token, process.env.JWT_PUBLIC_KEY);
};
