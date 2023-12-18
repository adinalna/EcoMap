import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import axiosClient from "../axios-client.js";
import LitterList from "../components/Pages/Litter/LitterList.jsx";
import { Chip, Autocomplete, TextField, ToggleButtonGroup, ToggleButton, Badge } from '@mui/material';

export default function Litter() {
  // const [litterTagging, setLitterTagging] = useState("All");
  const [litterPickedUp, setLitterPickedUp] = useState(null);
  const litterList = [
    {
      title: "Litter 1",
      medias: [
        {
          type: 'image',
          src: `${import.meta.env.VITE_APP_SUPABASE_STORAGE_BUCKET_URL}/litter/c27c25f9-d27b-4793-879c-4f20f747d122.jpeg`
        },
      ]
    },
    {
      title: "litter 2",
      medias: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800'
        },
      ]
    }
  ];

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
      <div
        style={{
          margin: "15px 0px",
          padding: "15px",
          borderRadius: "5px",
          backgroundColor: "#f0faf0",
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          border: "1px solid #ebe6e6"
        }}>


        <ToggleButtonGroup
          sx={{
            backgroundColor: "#fff",
            marginRight: "8px"
          }}
          value={litterPickedUp}
          exclusive
          onChange={(e, litterPickedUp) => setLitterPickedUp(litterPickedUp)}
          aria-label="text alignment"
          size="small"
        >
          <ToggleButton value={null} aria-label="centered">All</ToggleButton>
          <ToggleButton value={true} aria-label="centered">Picked Up</ToggleButton>
          <ToggleButton value={false} aria-label="centered">Not Picked Up</ToggleButton>
        </ToggleButtonGroup>

        <Autocomplete
          sx={{
            width: "770px",
            backgroundColor: "#fff"
          }}
          // disabled={litterTagging === "UnTagged"}
          multiple
          limitTags={10}
          id="multiple-limit-tags"
          size="small"
          options={tags}
          getOptionLabel={(option) => option.tag}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Litter Tag"
              placeholder="Litter Tag"
            />
          )}
        />
        {/* <Button disabled={litterTagging === "UnTagged"} variant="dark">Search</Button> */}
        <Button variant="dark">Search</Button>
      </div>
      <LitterList litterList={litterList} />
    </div >
  );
};