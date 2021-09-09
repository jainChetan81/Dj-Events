import PropTypes from "prop-types";
import styles from "@/styles/Form.module.css";
import { useState } from "react";
import { BASE_API } from "@/config/url";

const ImageUpload = ({ evtId, imageUploaded }) => {
	const [image, setImage] = useState(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("files", image);
		formData.append("ref", "events");
		formData.append("refId", evtId);
		formData.append("field", "image");
		console.log(`image`, image);
		const res = await fetch(`${BASE_API}/upload`, {
			method: "POST",
			body: formData,
		});
		if (res.ok) {
			imageUploaded();
		}
	};
	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
	};
	return (
		<div className={styles.form}>
			<h1>Upload Event Image</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.file}>
					<input type="file" onChange={handleFileChange} />
				</div>
				<input type="submit" value="Upload" className="btn" />
			</form>
		</div>
	);
};

ImageUpload.propTypes = {
	evtId: PropTypes.number.isRequired,
	imageUploaded: PropTypes.func.isRequired,
};

export default ImageUpload;
