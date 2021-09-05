import { defaultHead } from "next/head";
import PropTypes from "prop-types";
import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = (props) => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">Dj Events</Link>
			</div>
			<nav>
				<ul>
					<li>
						<Link href="/events">Events</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

Header.propTypes = {};

export default Header;
