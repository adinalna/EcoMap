import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import UploadMedia from "../components/Common/uploadMedia";
import axiosClient from "../axios-client.js";
import LitterList from "../components/Pages/Litter/LitterList.jsx";

export default function Litter() {
  const mediaList = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800', caption: 'test' },
    { type: 'video', src: 'https://assets.codepen.io/6093409/river.mp4', caption: 'test' },
    { type: 'video', src: 'https://assets.codepen.io/6093409/river.mp4', caption: 'test' },
    { type: 'video', src: 'https://assets.codepen.io/6093409/river.mp4', caption: 'test' },
    { type: 'video', src: 'https://assets.codepen.io/6093409/river.mp4', caption: 'test' },
  ];

  return (
    <div style={{margin: "5px 200px"}}>
      <h1>Litter</h1>
      <LitterList mediaList={mediaList} />
    </div>
  );
};