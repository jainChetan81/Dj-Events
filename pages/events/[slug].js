import Layout from "@/components/Layout";
import { useRouter } from "next/dist/client/router";
import React from "react";

const EventPage = () => {
	const router = useRouter();
	return (
		<Layout>
			<h1>{router.query.slug}</h1>
		</Layout>
	);
};

export default EventPage;
