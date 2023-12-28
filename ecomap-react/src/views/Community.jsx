import React, { useEffect, useState } from "react";
import "../community.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // npm install recharts

export default function Community() {

    const [chartData, setChartData] = useState([]);

    const data = [
        { name: 'Day 1', value: 2 },
        { name: 'Day 2', value: 5.5 },
        { name: 'Day 3', value: 2 },
        { name: 'Day 4', value: 8.5 },
        { name: 'Day 5', value: 1.5 },
        { name: 'Day 6', value: 5 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/litter/all");
                const data = await response.json();
                setChartData(data);
                console.log(chartData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

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
                <div class="community-graph">
                    <LineChart
                        width={500}
                        height={300}
                        data = {chartData}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </div>
            </div>
        </div>
    )
}