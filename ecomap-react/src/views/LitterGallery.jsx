import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import LitterFilter from "../components/Pages/Litter/LitterFilter.jsx";
import LitterList from "../components/Pages/Litter/LitterList.jsx";

export default function LitterGallery() {

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchLitterList();
  }, []);

  const fetchLitterList = async () => {
    try {
      const response = await axiosClient.get("/litter/all", { timeout: 5000 }); 
      const list = response.data;
      console.log(list);
      setFilteredData(list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (filters) => {
    // Implement the logic to fetch data based on filters
    // Example: fetchFilteredData(filters).then((data) => setFilteredData(data));
  };

  const tags = [
    { tag: 'paper', },
    { tag: 'metal', },
    { tag: 'plastic', },
    { tag: 'food', },
    { tag: 'clothes' },
  ];

  return (
    <div style={{ margin: "10px 200px" }}>
      <h1>Your Litter</h1>

      <LitterFilter tags={tags} onFilterChange={handleFilterChange} />
      <LitterList litterList={filteredData} />
    </div >
  );
};