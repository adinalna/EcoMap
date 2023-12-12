import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Handle file upload logic here
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // You can perform the file upload logic (e.g., send to server) here
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <div>
      <h1>File Uploader</h1>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Form>
    </div>
  );
}
