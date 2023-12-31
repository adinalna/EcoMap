import React, { useEffect, useState } from "react";
import "../community.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // npm install recharts

export default function Community() {

    const [chartData, setChartData] = useState([]);
    const [selectedRange, setSelectedRange] = useState("all");

    const [numOfLitter, setNumOfLitter] = useState([]);
    const [numOfLitterLength, setNumOfLitterLength] = useState(0);
    const [numOfLitterPerMonth, setNumOfLitterPerMonth] = useState(0);

    const [numOfMedia, setNumOfMedia] = useState([]);
    const [numOfMediaLength, setNumOfMediaLength] = useState(0);
    const [numOfMediaPerMonth, setNumOfMediaPerMonth] = useState(0);

    const [numOfTeams, setNumOfTeams] = useState([]);
    const [numOfTeamsLength, setNumOfTeamsLength] = useState(0);
    const [numOfTeamsPerMonth, setNumOfTeamsPerMonth] = useState(0);

    var dateCreatedArray = [];
    var formattedDates = [];
    let newObj = [];


    useEffect(() => {

        // Display the API based on the dropdown selection value (selectedRange)

        if(selectedRange === "all"){

            fetch('http://localhost:8080/api/litter/all')
           .then((response) => response.json())
           .then((data) => {

            setChartData(data);
            dateCreatedArray = data.map(item => item.dateCreated);
            formattedDates = dateCreatedArray
            .map(date => formatDateToMonthYear(date))
            .filter(date => date !== "Invalid Date");
           
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

           setChartData(newObj);
           })
           .catch((err) => {
              console.log(err.message);
           });

        } else if(selectedRange === "last3Months"){
            
            fetch('http://localhost:8080/api/litter/last_three_months')
            .then((response) => response.json())
            .then((data) => {
 
            console.log('3m data', data);
             setChartData(data);
             dateCreatedArray = data.map(item => item.dateCreated);
             formattedDates = dateCreatedArray

             .map(date => formatDateToMonthYear(date))
             .filter(date => date !== "Invalid Date");
            
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
 
            console.log('3m formatDate',formattedDates);
            console.log('3m newObj', newObj);
 
            setChartData(newObj);
            console.log('3 mo',chartData);
            })
            .catch((err) => {
               console.log(err.message);
            });

        } else if(selectedRange==="last6Months") {

            fetch('http://localhost:8080/api/litter/last_six_months')
            .then((response) => response.json())
            .then((data) => {
 
             console.log(data);
             setChartData(data);
             dateCreatedArray = data.map(item => item.dateCreated);
             console.log(dateCreatedArray);
             formattedDates = dateCreatedArray
             .map(date => formatDateToMonthYear(date))
             .filter(date => date !== "Invalid Date");
            
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

        } else if(selectedRange==="lastYear") {

            fetch('http://localhost:8080/api/litter/last_year')
            .then((response) => response.json())
            .then((data) => {
 
             console.log(data);
             setChartData(data);
             dateCreatedArray = data.map(item => item.dateCreated);
             console.log(dateCreatedArray);
             formattedDates = dateCreatedArray
             .map(date => formatDateToMonthYear(date))
             .filter(date => date !== "Invalid Date");
            
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

        } else if(selectedRange==="last3Years") {

            fetch('http://localhost:8080/api/litter/last_three_years')
            .then((response) => response.json())
            .then((data) => {
 
            setChartData(data);
            dateCreatedArray = data.map(item => item.dateCreated);

            formattedDates = dateCreatedArray
            .map(date => formatDateToMonthYear(date))
            .filter(date => date !== "Invalid Date");

            console.log('Formatted Dates', formattedDates)
            
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

 
            setChartData(newObj);
            })
            .catch((err) => {
               console.log(err.message);
            });

        }   
     }, [selectedRange]);

    useEffect(() => {
        try {
            fetch("http://localhost:8080/api/litter/last_three_months")
            .then((response) => response.json())
            .then((data) => {
                setNumOfLitter(data);
                setNumOfLitterLength(data.length);
                setNumOfLitterPerMonth((data.length/3).toFixed(2));
            })
        } catch (error) {
            console.log(error);
        }
     }, []);

    useEffect(() => {
        try {
            fetch("http://localhost:8080/api/media/all")
            .then((response) => response.json())
            .then((data) => {
                setNumOfMedia(data);
                setNumOfMediaLength(data.length);
                setNumOfMediaPerMonth((data.length/30).toFixed(2));
            })
        } catch (error) {
            console.log(error);
        }
     }, [])

     useEffect(() => {
        try {
            fetch("http://localhost:8080/api/teams")
            .then((response) => response.json())
            .then((data) => {
                setNumOfTeams(data);
                setNumOfTeamsLength(data.length);
                setNumOfTeamsPerMonth((data.length/30).toFixed(2));
            })
        } catch (error) {
            console.log(error);
        }
     }, [])
    // Used to format the Date so that it can be easily read in the line graph
    function formatDateToMonthYear(dateString) { 
        const options = { month: 'long', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
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
                        <h2>{numOfLitterLength}</h2>
                        <span>Litter uploaded last 90 days</span>
                        <span>{numOfLitterPerMonth} per month</span>
                    </div>
                    <div class="community-child-div">
                        <h2>{numOfMediaLength}</h2>
                        <span>Media uploaded last 30 days</span>
                        <span>{numOfMediaPerMonth} per day</span>
                    </div>
                    <div class="community-child-div">
                        <h2>{numOfTeamsLength}</h2>
                        <span>Number of EcoMap Teams <br></br>created last 30 days</span>
                        <span>{numOfTeamsPerMonth} per day</span>
                    </div>
                </div>
                <div class="community-graph">
                    <div class="community-select">
                    <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
                        <option value="all">All data</option>
                        <option value="last3Months">Last 3 Months</option>
                        <option value="last6Months">Last 6 Months</option>
                        <option value="lastYear">Last Year</option>
                        <option value="last3Years">Last 3 Years</option>
                    </select>
                </div>
                <div className="linechart">
                    <LineChart
                            width={800}
                            height={500}
                            data = {chartData}
                        >
                            <XAxis dataKey="name" />
                            <YAxis  dataKey="value" domain={['auto', 'auto']}/>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                </div>
                    
                    
                </div>
            </div>
        </div>
    )
}