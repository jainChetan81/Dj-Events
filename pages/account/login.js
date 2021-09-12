import { FaUser } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { loginUser, error } = useContext(AuthContext);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (valid()) {
			loginUser({ email, password });
		}
	};

	useEffect(() => {
		error && toast.error(error);
	});

	const valid = () => {
		if (!email || !password) {
			toast.error("Please Fill all Fields");
			return false;
		}
		return true;
	};
	return (
		<Layout title="User Login">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Log In
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
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
					<input type="submit" value="Login" className="btn" />
				</form>
				<p>
					Don&apos;t have an account?{" "}
					<Link href="/account/register">
						<a>Register</a>
					</Link>
				</p>
			</div>
		</Layout>
	);
};

export default LoginPage;
