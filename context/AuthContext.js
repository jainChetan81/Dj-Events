import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { NEXT_URL } from "../config/urlConstants";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState("");

	//register user
	const registerUser = async (user) => {
		console.log(`user`, user);
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
		console.log(`data`, data);
		if (res.ok) {
			setUser(data);
			setError("");
			localStorage.setItem("user", JSON.stringify(data));
			return data;
		} else {
			setError(data.message);
		}
	};

	//logout user
	const logoutUser = async () => {
		console.log("logout");
	};

	//check if user is logged in
	const checkUserLoggedIn = async (user) => {
		console.log("checkUserLoggedIn", user);
	};

	return (
		<AuthContext.Provider value={{ user, error, registerUser, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthContext;
