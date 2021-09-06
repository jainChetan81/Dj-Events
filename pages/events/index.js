import React from "react";
import Layout from "@/components/Layout";
import { ALL_EVENTS_URL } from "@/config/url";
import EventItem from "@/components/EventItem";

export default function EventsPage({ events }) {
	return (
		<Layout title="Home">
			<h1>Upcoming Events</h1>
			{events.length > 0 ? (
				events.map((evt) => <EventItem key={evt.id} evt={evt} />)
			) : (
				<h3>No Events to Show</h3>
			)}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(ALL_EVENTS_URL);
	const events = await res.json();
	return {
		props: { events },
		revalidate: 1,
	};
}
