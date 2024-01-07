import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare, faShareNodes } from "@fortawesome/free-solid-svg-icons";

function ShareButton({ onShare }) {
    const shareUrl = `https://www.google.com/maps/search/?api=1&query=${onShare.location.lat},${onShare.location.lng}`;

    //this doesn't work I need to figure out why? Also replace with a map direction instead.
    // Function to handle button click
    const handleClick = async () => {
        if (!navigator.share) {
            // Fallback for browsers that don't support the Web Share API
            alert(`Share this URL: ${shareUrl}`);
            return;
        }
        try {
            await navigator.share({
                title: "Check out this location on Google Maps",
                text: "Here is a cool location I found. Check it out!",
                url: shareUrl,
            });
            console.log("Shared successfully");
        } catch (err) {
            console.error("Error sharing", err);
        }
    };

    return (
        <button
            onClick={handleClick}
            style={{
                backgroundColor: "green",
                border: "none",
                borderRadius: "4px",
                padding: 12,
                cursor: "pointer",
                fontSize: "inherit",
                color: "inherit",
            }}
        >
            <FontAwesomeIcon icon={faShareNodes} size="1x" color="white" />
        </button>
    );
}

export default ShareButton;
