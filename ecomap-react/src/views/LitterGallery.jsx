import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import LitterFilter from "../components/Pages/Litter/LitterFilter.jsx";
import LitterList from "../components/Pages/Litter/LitterList.jsx";
import { Chip, Stack } from '@mui/material';
import { Typography, Sheet } from '@mui/joy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function LitterGallery() {
  const [litterData, setLitterData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchLitterList();
    fetchTagList();
  }, []);

  useEffect(() => {
    // This useEffect runs whenever litterData changes
    if (!initialLoad) {
      handleFilterChange({ litterPickedUp: null, selectedTags: [] });
    } else {
      setInitialLoad(false);
    }
  }, [litterData, initialLoad]);

  const fetchLitterList = async () => {
    try {
      const response = await axiosClient.get("/litter/all", { timeout: 5000 });
      const list = response.data;
      // console.log(list);
      setLitterData(list);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTagList = async () => {
    try {
      const response = await axiosClient.get("/tag/all", { timeout: 5000 });
      const list = response.data;
      // console.log(list);
      setTagData(list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (filters) => {
    const { litterPickedUp, selectedTags } = filters;

    let updatedData = litterData;

    if (litterPickedUp !== "All") {
      const pickedUpValue = litterPickedUp === "pickedUp";
      updatedData = updatedData.filter((litter) => litter.pickedUp === pickedUpValue);
    }

    if (selectedTags.length > 0) {
      updatedData = updatedData.filter((litter) =>
        selectedTags.some((tag) => litter.tags.some((litterTag) => litterTag.id === tag.id))
      );
    }

    setFilteredData(updatedData);
  };

  return (
    <div style={{ margin: "10px 200px" }}>
      <h1>Litter Gallery</h1>
      <Sheet variant="outlined" color="success" sx={{ p: 1, borderRadius: "5px" }}>
        <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
          <Typography variant="h6" color="textSecondary">
            <TrendingUpIcon style={{ marginRight: '8px' }} /> Trending Tags
          </Typography>
          <Stack direction="row" spacing={5} justifyContent="center">
            <Chip label="Last Week: Example" color="success" variant="outlined" />
            <Chip label="Last Month: Example" color="success" variant="outlined" />
            <Chip label="Last Year: Example" color="success" variant="outlined" />
            <Chip label="Ever: Example" color="success" variant="outlined" />
          </Stack>
        </Stack>
      </Sheet>
      <LitterFilter tags={tagData} onFilterChange={handleFilterChange} />
      <LitterList litterList={filteredData} type={"gallery"} />
    </div>
  );
}
