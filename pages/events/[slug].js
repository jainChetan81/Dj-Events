import Layout from "@/components/Layout";
import { BASE_API } from "@/config/url";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import React from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";

const EventPage = ({ evt }) => {
	const deleteEvent = (e) => {
		console.log("delete event");
	};

	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${evt.id}`} passHref>
						<a>
							<FaPencilAlt />
							Edit Event
						</a>
					</Link>
					<a className={styles.delete} onClick={deleteEvent}>
						<FaTimes />
						Delete Event
					</a>
				</div>
				<time>
					{evt.date} at {evt.time}
				</time>
				<h1>{evt.name}</h1>
				{evt.image && (
					<picture className={styles.image}>
						<Image src={evt.image} width={960} height={600} alt={evt.name} />
					</picture>
				)}
				<h3>Performers:</h3>
				<p>{evt.performers}</p>
				<h3>Description</h3>
				<p>{evt.description}</p>
				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>
				<Link href="/events">
					<a className={styles.back}> {"<"} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const res = await fetch(`${BASE_API}/api/events`);
	const events = await res.json();
	const paths = events.map((evt) => ({ params: { slug: evt.slug } }));
	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(`${BASE_API}/api/events/${slug}`);
	const events = await res.json();
	return {
		props: {
			evt: events[0],
		},
		revalidate: 1,
	};
}

EventPage.propTypes = {
	evt: PropTypes.object.isRequired,
};

export default EventPage;
