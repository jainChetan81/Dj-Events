import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/EventItem.module.css";
const EventItem = ({ evt }) => {
	return (
		<article className={styles.event}>
			<div className={styles.img}>
				<Image
					src={evt.image ? evt.image.formats.thumbnail.url : "/images/event-default.png"}
					alt={evt.name}
					width={170}
					height={100}
					loading="lazy"
				/>
			</div>
			<div className={styles.info}>
				<time>
					{new Date(evt.date).toLocaleDateString()} at {evt.time}
				</time>
				<h3>{evt.name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${evt.slug}`} as={`/events/${evt.slug}`} className="btn">
					Details
				</Link>
			</div>
		</article>
	);
};

EventItem.propTypes = {
	evt: PropTypes.object.isRequired,
};

export default EventItem;
