/* eslint-disable import/no-anonymous-default-export */
import { BASE_API } from "@/config/urlConstants";
import cookie from "cookie";

export default async (req, res) => {
	if (req.method === "GET") {
		if (!req.headers.cookie) res.status(403).json({ message: "Not Authorized" });
		const { token } = cookie.parse(req.headers.cookie);
		const strapiRes = await fetch(`${BASE_API}/user/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const user = await strapiRes.json();
		res.status(200).json(user);
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
