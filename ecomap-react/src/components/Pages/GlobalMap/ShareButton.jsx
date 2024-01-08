import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare, faShareNodes } from "@fortawesome/free-solid-svg-icons";

function ShareButton({ onShare }) {
    // const shareUrl = `https://www.google.com/maps/search/?api=1&query=${onShare.location.lat},${onShare.location.lng}`;

    // const handleClick = async () => {
    //     if (!navigator.share) {
    //         alert(`Share this URL: ${shareUrl}`);
    //         return;
    //     }
    //     try {
    //         await navigator.share({
    //             title: "Check out this location on Google Maps",
    //             text: "Here is a cool location I found. Check it out!",
    //             url: shareUrl,
    //         });
    //         console.log("Shared successfully");
    //     } catch (err) {
    //         console.error("Error sharing", err);
    //     }
    // };

    const shareUrl = `https://www.google.com/maps/place/${onShare.location.lat},${onShare.location.lng}`;

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            console.log("URL copied to clipboard successfully");
            alert("URL copied to clipboard. You can now paste it to share.");
        } catch (err) {
            console.error("Error copying to clipboard", err);
            alert(`Error copying to clipboard: ${err.message}`);
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
