import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/Form.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { BASE_API } from "@/config/urlConstants";

const EventsAddPage = () => {
	const [values, setValues] = useState({
		name: "",
		performers: "",
		venue: "",
		address: "",
		date: "",
		time: "",
		description: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const hasEmptyFields = Object.values(values).some((value) => value === "");
		if (hasEmptyFields) {
			toast.error("Please fill all fields");
			return;
		}
		values.slug = values.name
			.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^\w-]+/g, "");
		const res = await fetch(`${BASE_API}/events`, {
			method: "POST",
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
			<Link href="/events">Go Back</Link>
			<h1>Add Events</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div className="">
						<label htmlFor="name">Event Name</label>
						<input
							type="text"
							name="name"
							value={values.name}
							id="name"
							onChange={handleInputChange}
						/>
					</div>
					<div className="">
						<label htmlFor="performers">Performers </label>
						<input
							type="text"
							name="performers"
							value={values.performers}
							id="performers"
							onChange={handleInputChange}
						/>
					</div>
					<div className="">
						<label htmlFor="venue">Venue</label>
						<input
							type="text"
							name="venue"
							value={values.venue}
							id="venue"
							onChange={handleInputChange}
						/>
					</div>
					<div className="">
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							value={values.address}
							id="address"
							onChange={handleInputChange}
						/>
					</div>
					<div className="">
						<label htmlFor="date">Date</label>
						<input
							type="date"
							name="date"
							value={values.date}
							id="date"
							onChange={handleInputChange}
						/>
					</div>
					<div className="">
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
				<input type="submit" value="Add Event" className="btn" />
			</form>
		</Layout>
	);
};

export default EventsAddPage;
