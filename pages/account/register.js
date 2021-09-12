import { FaUser } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");
	const { registerUser, error } = useContext(AuthContext);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (valid()) {
			registerUser({ username, email, password });
		}
	};

	const valid = () => {
		if (password !== confirm_password) {
			toast.error("Password Not Matched");
			return false;
		}
		if (!username || !email || !password || !confirm_password) {
			toast.error("Please Fill All Fields");
			console.log(`error`);
			return false;
		}
		return true;
	};
	return (
		<Layout title="User Registration">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Sign Up
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">User Name</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							id="username"
						/>
					</div>
					<div>
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							id="password"
						/>
					</div>
					<div>
						<label htmlFor="confirm_password">Confirm Password</label>
						<input
							type="password"
							value={confirm_password}
							onChange={(e) => setConfirmPassword(e.target.value)}
							id="confirm_password"
						/>
					</div>
					<input type="submit" value="Signup" className="btn" />
				</form>
				<p>
					Already have an account?{" "}
					<Link href="/account/login">
						<a>Login</a>
					</Link>
				</p>
			</div>
		</Layout>
	);
};

export default RegisterPage;
