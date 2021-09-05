import { useRouter } from "next/dist/client/router";
import React from "react";


const EventPage = () => {
	const router = useRouter();
	return (
		<div>
			<h1>{router.query.slug}</h1>
		</div>
	);
};

export default EventPage;
