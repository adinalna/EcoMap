import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import axiosClient from "../axios-client.js";
import LitterList from "../components/Pages/Litter/LitterList.jsx";
import { Chip, Autocomplete, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';

export default function Litter() {
  const [mediaListType, setMediaListType] = useState('All');
  const mediaList = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800', caption: 'test' },
    { type: 'video', src: 'https://assets.codepen.io/6093409/river.mp4', caption: 'test' },
    { type: 'video', src: 'https://assets.codepen.io/6093409/river.mp4', caption: 'test' },
    { type: 'video', src: 'https://assets.codepen.io/6093409/river.mp4', caption: 'test' },
    { type: 'video', src: `${import.meta.env.VITE_APP_SUPABASE_STORAGE_BUCKET_URL}/litter/8284c060-33b6-473a-8c05-41568df93763.mp4`, caption: 'test' },
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
      <h1>Litter Tag</h1>
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
            backgroundColor: "#fff"
          }}
          value={mediaListType}
          exclusive
          onChange={(e, newMediaListType) => setMediaListType(newMediaListType)}
          aria-label="text alignment"
          size="small"
        >
          <ToggleButton value="All" aria-label="centered">All</ToggleButton>
          <ToggleButton value="Personal" aria-label="centered">Personal</ToggleButton>
        </ToggleButtonGroup>
        <Autocomplete
          sx={{
            width: "900px",
            backgroundColor: "#fff"
          }}
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
        <Button variant="dark">Search</Button>
      </div>
      <LitterList mediaList={mediaList} />
    </div >
  );
};