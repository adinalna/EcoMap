import React from "react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MarkerWithInfo from "../components/Pages/GlobalMap/MarkerWithInfo";

export default function Global() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    });

    const [litterMarkers, setMarkers] = useState([]);

    const [activeMarker, setActiveMarker] = useState(null);
    const [map, setMap] = useState(/** @type google.map.Maps*/ null);
    const [center, setCenter] = useState({ lat: 40.3947365, lng: 49.6898045 });

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

        fetchMarkers();
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
                <div style={{ height: "93vh", width: "100vw" }}>
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
                                </>
                            )}
                        </GoogleMap>
                    ) : null}
                </div>
            </div>
        </Fragment>
    );
}
