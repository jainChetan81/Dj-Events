import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { BASE_API } from "@/config/urlConstants";
import EventItem from "@/components/EventItem";

export default function Home({ events }) {
	return (
		<Layout title="Home">
			<h1>Upcoming Events</h1>
			{events?.length > 0 ? (
				events.map((evt) => <EventItem key={evt.id} evt={evt} />)
			) : (
				<h3>No Events to Show</h3>
			)}
			{events?.length > 3 && (
				<Link href="/events" className="btn btn-secondary">
					View All Events
				</Link>
			)}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${BASE_API}/events?_sort=date:ASC&_limit=3`);
	const events = (await res.json()) || [];
	return {
		props: { events },
		revalidate: 1,
	};
}
