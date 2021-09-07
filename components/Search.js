import styles from "@/styles/Search.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
	const [term, setTerm] = useState("");
	const router = useRouter();
	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/events/search?term=${term}`);
		setTerm("");
	};
	return (
		<div className={styles.search}>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Search for Events"
					autComplete="on"
					type="text"
					value={term}
					onChange={(e) => {
						setTerm(e.target.value);
					}}
				/>
			</form>
		</div>
	);
};

export default Search;
