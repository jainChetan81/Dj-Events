import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = (props) => {
	return (
		<footer className={styles.footer}>
			<p>Copyright &copy; DJ Events {new Date().getFullYear()}</p>
			<p>
				<Link href="/about">About this Project</Link>
			</p>
		</footer>
	);
};

Footer.propTypes = {};

export default Footer;
