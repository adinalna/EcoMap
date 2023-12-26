import React from "react";
import "../community.css"; // Import the CSS file for styling

export default function Community() {
    return (
        <div>
            <div class="community-container">
                <h1><b>Help us change the world</b></h1>
                <h3>We're growing by day</h3>
            </div>
            <div class="community-container blue">
                <div class="community-div">
                    <div class="community-child-div">
                        <h2>2062</h2>
                        <span>Photos uploaded last 30 days</span>
                        <span>0.05 per minute</span>
                    </div>
                    <div class="community-child-div">
                        <h2>29</h2>
                        <span>New users last 30 days</span>
                        <span>0.97 per day</span>
                    </div>
                    <div class="community-child-div">
                        <h2>2053</h2>
                        <span>Litter tagged last 30 days</span>
                        <span>0.05 per minute</span>
                    </div>
                </div>
                <div class="community-graph"></div>
            </div>
        </div>
    )
}