import Head from "next/head";
import PropTypes from "prop-types";
import styles from "@/styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import ShowCase from "./Showcase";
import { useRouter } from "next/router";

function Layout({ title, keywords, description, children }) {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Header />
			{router.pathname == "/" && <ShowCase />}
			<main className={styles.container}>{children}</main>
			<Footer />
		</div>
	);
}
Layout.defaultProps = {
	title: "DJ Events | FInd the hottest Parties",
	description: "FInd The latest DJ's and other events",
	keywords: "DJ, Events, Parties, Parties",
};
Layout.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	keywords: PropTypes.string,
};

export default Layout;
