/* eslint-disable import/no-anonymous-default-export */
import { BASE_API } from "@/config/urlConstants";
import cookie from "cookie";

export default async (req, res) => {
	if (req.method === "POST") {
		const { identifier, password } = req.body;
		const strapiRes = await fetch(`${BASE_API}/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ identifier, password }),
		});
		const data = await strapiRes.json();
		console.log(`data`, data);
		if (strapiRes.ok) {
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("token", data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					maxAge: 60 * 60 * 24 * 7, //1 week
					sameSite: "strict",
					path: "/",
				})
			)
				.status(200)
				.json({ user: data.user });
		} else res.status(data.statusCode).json({ message: data.message[0].messages[0].message });
	} else {
		res.setHeader("Allow", ["POST", "PUT"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
