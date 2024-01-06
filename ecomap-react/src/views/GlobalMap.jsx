import React from "react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {
    GoogleMap,
    InfoWindowF,
    MarkerF,
    useLoadScript,
} from "@react-google-maps/api";

export default function Global() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    });

    const [litterMarkers, setMarkers] = useState([]);

    const [activeMarker, setActiveMarker] = useState(null);
    const [map, setMap] = useState(/** @type google.map.Maps*/ null);
    const [center, setCenter] = useState({ lat: 40.3947365, lng: 49.6898045 }); // Default center

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                // const response = await axios.get(
                //     "http://localhost:8080/api/media"
                // );
                const response = await axios.get(
                    "http://localhost:8080/api/litter/all"
                );
                setMarkers(response.data);
                console.log(response.data);
                // console.log("hello");
            } catch (error) {
                console.error("Error fetching litterMarkers:", error);
            }
        };

        fetchMarkers();
    }, []);

    useEffect(() => {
        // Get the user's current location using Geolocation API
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
            <div className="container">
                <div style={{ height: "90vh", width: "100%" }}>
                    {isLoaded ? (
                        <GoogleMap
                            center={center}
                            zoom={10}
                            onClick={() => setActiveMarker(null)}
                            onLoad={(map) => setMap(map)}
                            mapContainerStyle={{
                                width: "100%",
                                height: "90vh",
                            }}
                        >
                            {map && litterMarkers && (
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
                                        }) => (
                                            <MarkerF
                                                key={id}
                                                position={{
                                                    lat: media[0].locationY,
                                                    lng: media[0].locationX,
                                                }}
                                                onClick={() =>
                                                    handleActiveMarker(id)
                                                }
                                            >
                                                {activeMarker === id ? (
                                                    <InfoWindowF
                                                        onCloseClick={() =>
                                                            setActiveMarker(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                gap: 10,
                                                                width: "300px",
                                                                padding: "10px",
                                                                paddingRight:
                                                                    "4px",
                                                                // border: "1px solid #ccc",
                                                                boxShadow:
                                                                    "0 0 10px rgba(0, 0, 0, 0.1)",
                                                                backgroundColor:
                                                                    "#fff", // Set the background color of the InfoWindow
                                                            }}
                                                        >
                                                            <img
                                                                src={`https://yfipsoqnsipqnjqnmnqs.supabase.co/storage/v1/object/public/ecomap/${media[0].path}`}
                                                                alt="Marker"
                                                                style={{
                                                                    height: "180px", // Set the desired height
                                                                    width: "100%", // Ensure the image takes up the full width
                                                                    objectFit:
                                                                        "cover", // Maintain aspect ratio and cover the container
                                                                    borderRadius:
                                                                        "4px",
                                                                }}
                                                            />
                                                            <p
                                                                style={{
                                                                    margin: 0,
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize:
                                                                        "18px",
                                                                }}
                                                            >
                                                                {pickedUp
                                                                    ? "Was picked up!"
                                                                    : "Was not picked up!"}
                                                            </p>
                                                            <div>
                                                                <strong>
                                                                    {address}
                                                                </strong>
                                                                <br />
                                                            </div>
                                                            <p
                                                                style={{
                                                                    margin: 0,
                                                                }}
                                                            >
                                                                By {user}
                                                            </p>
                                                            <p
                                                                style={{
                                                                    margin: 0,
                                                                }}
                                                            >
                                                                {dateCreated.toString()}
                                                            </p>
                                                            <button
                                                                style={{
                                                                    padding:
                                                                        "8px",
                                                                    backgroundColor:
                                                                        "#007BFF",
                                                                    color: "#fff",
                                                                    border: "none",
                                                                    borderRadius:
                                                                        "4px",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() =>
                                                                    console.log(
                                                                        "Button clicked!"
                                                                    )
                                                                }
                                                            >
                                                                Click me
                                                            </button>
                                                        </div>
                                                    </InfoWindowF>
                                                ) : null}
                                            </MarkerF>
                                        )
                                    )}
                                </>
                            )}
                        </GoogleMap>
                    ) : null}
                </div>
            </div>
        </Fragment>
    );
}
