import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "450px", // Set your desired width
  height: "400px", // Set your desired height
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const Maps = ({ onCoordinateChange }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  const [center, setCenter] = useState({
    lat: 7.2905715,
    lng: 80.6337262,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [xCoordinate, setXCoordinate] = useState("");
  const [yCoordinate, setYCoordinate] = useState("");

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
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    setXCoordinate(clickedLat.toFixed(6));
    setYCoordinate(clickedLng.toFixed(6));

    // Clear existing markers and add a new one
    setMarkers([
      {
        lat: clickedLat,
        lng: clickedLng,
        name: "",
      },
    ]);

    onCoordinateChange(clickedLat.toFixed(6), clickedLng.toFixed(6));
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
              setIsEditing(false);
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => {
              setSelectedMarker(null);
              setIsEditing(false);
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <label>
                <strong>X-Coordinate:</strong>{" "}
                <input type="text" value={xCoordinate} readOnly />
              </label>
              <br />
              <label>
                <strong>Y-Coordinate:</strong>{" "}
                <input type="text" value={yCoordinate} readOnly />
              </label>
              <br />
              <label>
                <strong>Event:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  <span>{selectedMarker.name}</span>
                )}
              </label>
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

export default Maps;
