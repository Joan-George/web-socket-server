import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";
export const signJWT = ({ data }: { data: { id: string; username: string; email: string } }) => {
	return jsonwebtoken.sign(data, process.env.JWT_PRIVATE_KEY ?? "", { algorithm: "RS256", expiresIn: "1h" });
};

export const verifyJWT = ({ token }: { token: string }) => {
	return jsonwebtoken.verify(token, process.env.JWT_PUBLIC_KEY ?? "");
};
