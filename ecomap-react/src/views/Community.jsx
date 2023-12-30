import React, { useEffect, useState } from "react";
import "../community.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // npm install rechartsss

export default function Community() {

    const [chartData, setChartData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRange, setSelectedRange] = useState("last3Years");
    var dateCreatedArray = [];
    var formattedDates = [];
    let newObj = [];

    useEffect(() => {
        fetch('http://localhost:8080/api/litter/all')
           .then((response) => response.json())
           .then((data) => {

            console.log(data);
            setChartData(data);
            dateCreatedArray = data.map(item => item.dateCreated);
            console.log(dateCreatedArray);
           formattedDates = dateCreatedArray.map(date => formatDateToMonthYear(date));
           
           // Count occurrences of each month-year
            const monthYearCount = {};
            formattedDates.forEach(monthYear => {
                monthYearCount[monthYear] = (monthYearCount[monthYear] || 0) + 1;
            });

            // Create a new object with the desired format
            newObj = Object.keys(monthYearCount).map(monthYear => ({
                name: monthYear,
                value: monthYearCount[monthYear].toString()
            }));

           console.log('formatDate',formattedDates);
           console.log('newObj', newObj);

           setChartData(newObj);
           console.log(chartData);
           })
           .catch((err) => {
              console.log(err.message);
           });
           
        
     }, []);

     function formatDateToMonthYear(dateString) {
        const options = { month: 'long', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        console.log(formattedDate,'fDTMY function')
        return formattedDate;
    }


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
                    <div>
                    <select>
                        <option value="last3Years">Last 3 Years</option>
                        <option value="lastYear">Last Year</option>
                        <option value="last6Months">Last 6 Months</option>
                        <option value="last3Months">Last 3 Months</option>
                    </select>
                    </div>
                     {/* Dropdown for selecting time range */}

                    <LineChart
                        width={1500}
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