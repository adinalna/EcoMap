import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const App = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
        libraries,
    });

    const [center, setCenter] = useState({
        lat: 7.2905715, // default latitude
        lng: 80.6337262, // default longitude
    });

    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            console.error("Error: Your browser doesn't support geolocation.");
        }
    }, []);

    const handleMapClick = (event) => {
        setMarkers((prevMarkers) => [
            ...prevMarkers,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                name: "", // Initialize with an empty name
            },
        ]);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedName(selectedMarker.name);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        setSelectedMarker((prevMarker) => ({
            ...prevMarker,
            name: editedName,
        }));
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    if (!googleMapsApiKey) {
        return <div>Please set up your Google Maps API Key in .env</div>;
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                onClick={handleMapClick}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelectedMarker(marker);
                            setIsEditing(false); // Reset editing state when a new marker is clicked
                        }}
                    />
                ))}

                {selectedMarker && (
                    <InfoWindow
                        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                        onCloseClick={() => {
                            setSelectedMarker(null);
                            setIsEditing(false); // Reset editing state when the InfoWindow is closed
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {/* Display the image */}
                            {!isEditing && (
                                <img
                                    src="imagePlaceholder.png"  // Replace with the actual URL of your image
                                    alt="Event Image"
                                    style={{ width: 100, height: 100, marginBottom: 10 }}
                                />
                            )}

                            <label>
                                <strong>X-Coordinate:</strong>{" "}
                            </label>
                            <span>{selectedMarker.lat}</span>
                            <br />
                            <label>
                                <strong>Y-Coordinate:</strong>{" "}
                            </label>
                            <span>{selectedMarker.lng}</span>
                            <br />
                            <label>
                                <strong>Event:</strong>{" "}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                            ) : (
                                <span>{selectedMarker.name}</span>
                            )}
                            <br />
                            {isEditing ? (
                                <>
                                    <button onClick={handleSaveClick}>Save</button>
                                    <button onClick={handleCancelClick}>Cancel</button>
                                </>
                            ) : (
                                <button onClick={handleEditClick}>Edit</button>
                            )}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
};

export default App;