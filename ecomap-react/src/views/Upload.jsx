import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import UploadMedia from "../components/Common/uploadMedia";
import axiosClient from "../axios-client.js";
import LitterList from "../components/Pages/Litter/LitterList.jsx";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(`${import.meta.env.VITE_APP_SUPABASE_STORAGE_BUCKET_URL}/litter/411a0083-ad1c-4c5f-acde-a9e2c3c6e453.mp4`);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadComplete = ({ uploadSuccess, fileName }) => {
    console.log("Upload success:", uploadSuccess);
    if (uploadSuccess) {
      console.log("File Name:", fileName);
      const supabaseStorageMediaUrl = `${import.meta.env.SUPABASE_STORAGE_BUCKET_URL}/${fileName}`;
      console.log("URL", supabaseStorageMediaUrl);
      setMediaUrl(supabaseStorageMediaUrl);

      // axiosClient.post('/upload', payload)
      //   .then(({ data }) => {

      //   })
      //   .catch((err) => {
      //     const response = err.response;
      //     if (response && response.status === 422) {
      //       setErrors(response.data.message)
      //     }
      //   })
    };
  }


  return (
    <div>
      <h1>File Uploader</h1>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <UploadMedia
          selectedFile={selectedFile}
          pathFolder="litter"
          onUploadComplete={handleUploadComplete}
          customButton={({ onUpload }) => (
            <Button variant="primary" onClick={onUpload}>
              Upload
            </Button>
          )}
        />
        {/* {mediaUrl &&
          <video height="380px" controls>
            <source src={mediaUrl} type="video/mp4" />
          </video>} */}
      </Form>
    </div>
  );
};