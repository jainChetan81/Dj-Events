import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Form.module.css";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { BASE_API } from "@/config/urlConstants";
import moment from "node_modules/moment/moment";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

const EditEventPage = ({ evt }) => {
	const [values, setValues] = useState({
		name: evt.name,
		performers: evt.performers,
		venue: evt.venue,
		address: evt.address,
		date: evt.date,
		time: evt.time,
		description: evt.description,
	});
	const [preview, setPreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null);
	const [showModal, setShowModal] = useState(false);

	const imageUploaded = async () => {
		const res = await fetch(`${BASE_API}/events/${evt.id}`);
		const data = await res.json();
		setPreview(data.image.formats.thumbnail.url);
		setShowModal(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const hasEmptyFields = Object.values(values).some((value) => value === "");
		if (hasEmptyFields) {
			toast.error("Please fill all fields");
			return;
		}
		const res = await fetch(`${BASE_API}/events/${evt.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		});
		if (!res.ok) toast.error("Something went wrong");
		else {
			const evt = await res.json();
			router.push(`/events/${evt.slug}`);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const router = useRouter();
	return (
		<Layout title="Add New Event">
			<Link href="/events">Edit Back</Link>
			<h1>Add Events</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event Name</label>
						<input
							type="text"
							name="name"
							value={values.name}
							id="name"
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="performers">Performers </label>
						<input
							type="text"
							name="performers"
							value={values.performers}
							id="performers"
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="venue">Venue</label>
						<input
							type="text"
							name="venue"
							value={values.venue}
							id="venue"
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							value={values.address}
							id="address"
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<input
							type="date"
							name="date"
							value={moment(values.date).format("yyyy-MM-DD")}
							id="date"
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input
							type="text"
							name="time"
							value={values.time}
							id="time"
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="">
					<label htmlFor="description">Description</label>
					<textarea
						type="textarea"
						name="description"
						value={values.description}
						id="description"
						onChange={handleInputChange}
					/>
				</div>
				<input type="submit" value="Update Event" className="btn" />
			</form>
			<h2>Event Image</h2>
			{preview ? (
				<Image src={preview} alt={`${values.name} image`} height="100" width="170" />
			) : (
				<div>
					<p>No Image Upload</p>
				</div>
			)}
			<div>
				<button className="btn-secondary" onClick={() => setShowModal(true)}>
					<FaImage />
					Set Image
				</button>
			</div>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
			</Modal>
		</Layout>
	);
};

export default EditEventPage;

export async function getServerSideProps({ params: { id } }) {
	const res = await fetch(`${BASE_API}/events/${id}`);
	const evt = await res.json();
	return {
		props: { evt },
	};
}
