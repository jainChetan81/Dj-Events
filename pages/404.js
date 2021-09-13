import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/404.module.css";
import { FaExclamationTriangle } from "react-icons/fa";
import React from "react";
const NotFoundPage = () => {
	return (
		<Layout title="Page Not Found">
			<div className={styles.error}>
				<h1>
					<FaExclamationTriangle /> 404
				</h1>
				<h4>Sorry, the page was not found</h4>
				<Link href="/">Go Back Home</Link>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
