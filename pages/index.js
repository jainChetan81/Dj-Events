import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home() {
	return (
		<Layout title="Home">
			<h1>main</h1>
			<Link href="/about">about</Link>
		</Layout>
	);
}
