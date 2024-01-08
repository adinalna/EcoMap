import React, { useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import ShareButton from "./ShareButton";
import cleanUpPin from "../../../../src/assets/cleanUpPin.svg";
import axios from "axios";

function CleanUpMarkerWithInfo({
    id,
    name,
    location_x,
    location_y,
    image,
    date,
    description,
    isPublic,
    dateCreated,
    activeMarker,
    handleActiveMarker,
    setActiveMarker,
}) {
    const [loading, setLoading] = useState(false);

    const handleJoinEvent = async (cleanupId) => {
        const userId = 1;
        try {
            setLoading(true);

            const response = await axios.get(
                `http://localhost:8080/api/usercleanup/find?userId=${userId}&cleanupId=${cleanupId}`
            );
            alert("User has successfully joined the Cleanup", response.data);
        } catch (error) {
            console.error(
                "Error joining cleanup event:",
                error.response ? error.response.data : error.message
            );
        }
        setLoading(false);
    };
    return (
        <MarkerF
            key={id}
            position={{
                lat: location_x,
                lng: location_y,
            }}
            onClick={() => handleActiveMarker(id)}
            icon={cleanUpPin}
        >
            {activeMarker === id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                            width: "300px",
                            padding: "6px",
                            paddingRight: "0px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#fff",
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontWeight: "bold",
                                fontSize: "18px",
                            }}
                        >
                            {name}
                        </p>
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            {description}
                        </p>

                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            Joined US on {date}
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "12px",
                            }}
                        >
                            Created on: {dateCreated.toString()}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: "5px",
                            }}
                        >
                            <button
                                style={{
                                    padding: "8px",
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    width: "100%",
                                }}
                                onClick={() => handleJoinEvent(id)}
                                disabled={loading}
                            >
                                {!loading ? "Join Clean Up" : "loading..."}
                            </button>
                            <ShareButton
                                onShare={{
                                    location: {
                                        lat: parseFloat(location_y),
                                        lng: parseFloat(location_x),
                                    },
                                }}
                            />
                        </div>
                    </div>
                </InfoWindowF>
            ) : null}
        </MarkerF>
    );
}

export default CleanUpMarkerWithInfo;
