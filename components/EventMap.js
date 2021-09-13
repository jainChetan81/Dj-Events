import PropTypes from "prop-types";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";
import ReactMapGL, { Marker } from "react-map-gl";
import { NEXT_PUBLIC_GOOGLE_API_KEY } from "@/config/constants";

const EventMap = ({ evt }) => {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [loading, setLoading] = useState(true);
	const [viewPort, setViewPort] = useState({
		latitude: 37.777,
		longitude: -122.447,
		zoom: 8,
		width: "100%",
		height: "500px",
	});

	useEffect(() => {
		const getLocation = async () => {
			const res = await Geocode.fromAddress("Eiffel Tower");
			const { lat: latitude, lng: longitude } = res.results[0].geometry.location;
			setLat(latitude);
			setLng(longitude);
			setViewPort({ ...viewPort, latitude, longitude });
			setLoading(false);
		};

		getLocation();
	}, []);

	Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || NEXT_PUBLIC_GOOGLE_API_KEY);
	if (loading) return false;
	console.log(`lat,lng`, lat, lng);

	return (
		<ReactMapGL
			{...viewport}
			mapboxApiAccessToken={NEXT_PUBLIC_GOOGLE_API_KEY}
			onViewportChange={(viewport) => setViewport(viewport)}>
			<Marker key={evt.id} latitude={lat} longitude={lng}>
				<Image src="./images/pin.svg" width={30} height={30} alt="Pin marker" />
			</Marker>
		</ReactMapGL>
	);
};

EventMap.propTypes = {
	evt: PropTypes.object.isRequired,
};

export default EventMap;
