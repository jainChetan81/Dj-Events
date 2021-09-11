import Layout from "@/components/Layout";
import { BASE_API } from "@/config/urlConstants";
import EventItem from "@/components/EventItem";
import { EVENTS_PER_PAGE } from "@/config/constants";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, totalEvents, page }) {
	return (
		<Layout title="Home">
			<h1>Upcoming Events</h1>
			{events?.length > 0 ? (
				events.map((evt) => <EventItem key={evt.id} evt={evt} />)
			) : (
				<h3>No Events to Show</h3>
			)}
			<Pagination currentPage={page} total={totalEvents} eventsPerPage={EVENTS_PER_PAGE} />
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	//calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * EVENTS_PER_PAGE;
	//fetch total count
	const totalRes = await fetch(`${BASE_API}/events/count`);
	const totalEvents = await totalRes.json();
	//fetch events
	const res = await fetch(
		`${BASE_API}/events?_sort=date:ASC&_limit=${EVENTS_PER_PAGE}&_start=${start}`
	);
	const events = await res.json();
	return {
		props: { events, page: +page, totalEvents },
	};
}
