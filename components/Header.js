import styles from "@/styles/Header.module.css";
import Link from "next/link";
import Search from "./Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Header = () => {
	const { user, logoutUser } = useContext(AuthContext);
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">Dj Events</Link>
			</div>
			<Search />
			<nav>
				<ul>
					<li>
						<Link href="/events">Events</Link>
					</li>
					{user ? (
						<>
							<li>
								<Link href="/events/add">Add Event</Link>
							</li>
							<li>
								<Link href="/account/dashboard">Dashboard</Link>
							</li>
							<li>
								<button
									onClick={() => logoutUser()}
									className="btn-secondary btn-icon">
									<FaSignOutAlt />
									Logout
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link href="/account/login">
									<a className="btn-icon btn-secondary">
										<FaSignInAlt /> Login
									</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

Header.propTypes = {};

export default Header;
