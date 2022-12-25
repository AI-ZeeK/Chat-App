import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connect } from "getstream";
import bcrypt from "bcryptjs";
import { StreamChat } from "stream-chat";
import crypto from "crypto";

const api_key: any = process.env.STREAM_API_KEY;
const api_secret: any = process.env.STREAM_API_SECRET;
const app_id: any = process.env.STREAM_APP_ID;

interface ReqRes {
	(req: Request, res: Response, next: NextFunction): any;
}
export const SignUp: ReqRes = async (req, res) => {
	try {
		const { fullName, username, password, phoneNumber } = req.body;
		// Creating User Id's
		const userId = crypto.randomBytes(16).toString("hex");

		const serverClient = connect(api_key, api_secret, app_id);

		const hashedPassword = await bcrypt.hash(password, 10);

		const token = serverClient.createUserToken(userId);
		// console.log({ token, fullName, username, userId, hashedPassword, phoneNumber });

		res
			.status(200)
			.json({ token, fullName, username, userId, hashedPassword, phoneNumber });
	} catch (error) {
		console.log(error, "hbhfgf");

		res.status(400).json({ message: error });
	}
};

export const login: ReqRes = async (req, res) => {
	try {
		const { username, password } = req.body;
		const serverClient = connect(api_key, api_secret, app_id);

		const client = StreamChat.getInstance(api_key, api_secret);
		// Find user
		const { users }: any = await client.queryUsers({ name: username });

		if (!users.length)
			return res.status(400).json({ message: "User not found" });

		const success = await bcrypt.compare(password, users[0].hashedPassword);

		const token = serverClient.createUserToken(users[0].id);

		if (success) {
			res.status(200).json({
				token,
				fullName: users[0].fullName,
				username,
				userId: users[0].id,
			});
		} else {
			res.status(500).json({ message: "Incorrect Password" });
		}
	} catch (error) {
		console.log(error, "hhhhh");
		res.status(400).json({ message: error });
	}
};
