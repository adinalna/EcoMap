import React from "react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import MarkerWithInfo from "../components/Pages/GlobalMap/MarkerWithInfo";

export default function Global() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    });

    const [litterMarkers, setMarkers] = useState([]);
    const [cleanUpMarkers, setCleanUpMarkes] = useState([]);

    const [activeMarker, setActiveMarker] = useState(null);
    const [map, setMap] = useState(/** @type google.map.Maps*/ null);
    const [center, setCenter] = useState({ lat: 40.3947365, lng: 49.6898045 });

    //fetch both litter and cleanup Markers
    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/litter/all"
                );
                setMarkers(response.data);
            } catch (error) {
                console.error("Error fetching litterMarkers:", error);
            }
        };

        const fetchCleanUp = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/cleanup/list"
                );
                setCleanUpMarkes(response.data);

                console.log(response.data);
            } catch (error) {
                console.error("Error fetching cleanUpMarkers:", error);
            }
        };

        fetchMarkers();
        fetchCleanUp();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting user's location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    return (
        <Fragment>
            <div className="">
                <div style={{ height: "80vh", width: "100vw" }}>
                    {isLoaded ? (
                        <GoogleMap
                            center={center}
                            zoom={3}
                            onClick={() => setActiveMarker(null)}
                            onLoad={(map) => setMap(map)}
                            mapContainerStyle={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {map && litterMarkers && cleanUpMarkers && (
                                <>
                                    {/* <HeatmapLayerF
                                        data={litterMarkers.map(
                                            (data) =>
                                                new google.maps.LatLng(
                                                    data.position.lat,
                                                    data.position.lng
                                                )
                                        )}
                                        options={{ radius: 50 }}
                                    /> */}
                                    {litterMarkers.map(
                                        ({
                                            id,
                                            user,
                                            dateCreated,
                                            pickedUp,
                                            address,
                                            country,
                                            city,
                                            media,
                                            litterTags,
                                        }) =>
                                            media.length > 0 && (
                                                <MarkerWithInfo
                                                    key={id}
                                                    id={id}
                                                    media={media}
                                                    user={user}
                                                    dateCreated={dateCreated}
                                                    pickedUp={pickedUp}
                                                    address={address}
                                                    activeMarker={activeMarker}
                                                    handleActiveMarker={
                                                        handleActiveMarker
                                                    }
                                                    setActiveMarker={
                                                        setActiveMarker
                                                    }
                                                    litterTags={litterTags}
                                                />
                                            )
                                    )}
                                    {/* {cleanUpMarkers.map(
                                        ({ id, location_x, location_y }) =>
                                            location_x &&
                                            location_y && (
                                                <MarkerF
                                                    key={id}
                                                    position={{
                                                        lat: parseFloat(
                                                            location_y
                                                        ),
                                                        lng: parseFloat(
                                                            location_x
                                                        ),
                                                    }}
                                                />
                                            )
                                    )} */}
                                </>
                            )}
                        </GoogleMap>
                    ) : null}
                </div>
                {cleanUpMarkers.map(
                    ({ id, location_x, location_y }) =>
                        location_x &&
                        location_y && (
                            <>
                                <div>{id}</div>
                                <div>helo</div>
                            </>
                        )
                )}
            </div>
        </Fragment>
    );
}
