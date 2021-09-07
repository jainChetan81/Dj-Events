import Layout from "@/components/Layout";
import { BASE_API } from "@/config/url";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchPage({ events }) {
	const router = useRouter();
	return (
		<Layout title="Home">
			<Link href="/">Go Back</Link>
			<h1>Search Results for &quot;{router.query.term}&quot;</h1>
			{events?.length > 0 ? (
				events.map((evt) => <EventItem key={evt.id} evt={evt} />)
			) : (
				<h3>No Events to Show</h3>
			)}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ description_contains: term },
				{ performers_contains: term },
				{ venue_contains: term },
			],
		},
	});
	const res = await fetch(`${BASE_API}/events?${query}`);
	const events = await res.json();
	return {
		props: { events },
	};
}
