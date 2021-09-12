import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";
import { NEXT_URL } from "../config/urlConstants";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => checkUserLoggedIn(), []);
	const router = useRouter();

	//register user
	const registerUser = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();
		if (res.ok) {
			setUser(data.user);
			setError("");
			router.push("/account/dashboard");
		} else {
			setError(data.message);
			setError(null);
		}
	};

	//login user
	const loginUser = async ({ email: identifier, password }) => {
		const res = await fetch(`${NEXT_URL}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});
		const data = await res.json();
		if (res.ok) {
			setUser(data.user);
			setError("");
			router.push("/account/dashboard");
		} else {
			setError(data.message);
			setError(null);
		}
	};

	//logout user
	const logoutUser = async () => {
		const res = await fetch(`${NEXT_URL}/api/logout`, {
			method: "POST",
		});
		if (res.ok) {
			setUser(null);
			router.push("/");
		}
	};

	//check if user is logged in
	const checkUserLoggedIn = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/user`);
		const data = await res.json();
		if (res.ok) setUser(data);
		else setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, error, registerUser, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthContext;
