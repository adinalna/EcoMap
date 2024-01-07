import React from "react";
import { Marker, InfoWindowF } from "@react-google-maps/api";
import ShareButton from "./ShareButton";
import { getPinIcon } from "./helpers/markerHelpers";

function MarkerWithInfo({
    id,
    media,
    user,
    dateCreated,
    pickedUp,
    address,
    activeMarker,
    handleActiveMarker,
    setActiveMarker,
    litterTags,
}) {
    return (
        <Marker
            key={id}
            position={{
                lat: media[0].locationY,
                lng: media[0].locationX,
            }}
            onClick={() => handleActiveMarker(id)}
            icon={getPinIcon(pickedUp)}
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
                        <img
                            src={`https://yfipsoqnsipqnjqnmnqs.supabase.co/storage/v1/object/public/ecomap/${media[0].path}`}
                            alt="Marker"
                            style={{
                                height: "180px",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "4px",
                            }}
                        />
                        <p
                            style={{
                                margin: 0,
                                fontWeight: "bold",
                                fontSize: "18px",
                            }}
                        >
                            {pickedUp
                                ? "✅ Was picked up!"
                                : "❌ Was not picked up!"}
                        </p>
                        {litterTags.length > 0 && (
                            <div style={{}}>
                                {litterTags.map(({ id, titleValue, count }) => (
                                    <div
                                        style={{ display: "flex", gap: "5px" }}
                                    >
                                        <span
                                            key={id}
                                            style={{ fontWeight: "300" }}
                                        >
                                            {titleValue}:
                                        </span>
                                        <span style={{ fontWeight: "600" }}>
                                            {count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            {address}
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
                                onClick={() => console.log("Button clicked!")}
                            >
                                Click me
                            </button>
                            <ShareButton
                                onShare={{
                                    location: {
                                        lat: media[0].locationY,
                                        lng: media[0].locationX,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </InfoWindowF>
            ) : null}
        </Marker>
    );
}

export default MarkerWithInfo;
