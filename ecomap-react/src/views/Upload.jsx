import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import MediaUpload from "../components/Common/MediaUpload.jsx"; 
import axiosClient from "../axios-client.js";

export default function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesToBeUploaded, setFilesToBeUploaded] = useState(true);
  const [showUploadButton, setShowUploadButton] = useState(true);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (file) => {
    const updatedFiles = selectedFiles.filter((selectedFile) => selectedFile !== file);
    setSelectedFiles(updatedFiles);
  };

  const handleUploadComplete = ({ overallUploadSuccess, fileResults }) => {
    console.log("Upload success:", overallUploadSuccess);

    if (overallUploadSuccess) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...fileResults]);
      setFilesToBeUploaded(false);
      setShowUploadButton(false);
    }
  };

  const openFileDialog = () => {
    // Trigger the file input dialog
    document.getElementById("fileInput").click();
  };

  const uploadMoreFiles = () => {
    setSelectedFiles([]);
    setUploadedFiles([])
    setFilesToBeUploaded(true);
    setShowUploadButton(true);
  };

  return (
    <div>
      <h1>File Uploader</h1>
      <Form>
        {filesToBeUploaded && (
          <Button variant="primary" onClick={openFileDialog}>
            Choose File
          </Button>
        )}

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />

        {/* Display selected files list */}
        {filesToBeUploaded && selectedFiles.length > 0 && (
          <ListGroup>
            {selectedFiles.map((file, index) => (
              <ListGroup.Item key={index}>
                {file.name}
                <Button variant="danger" size="sm" onClick={() => removeFile(file)}>
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {filesToBeUploaded && showUploadButton && selectedFiles.length > 0 && (
          <MediaUpload
            selectedFiles={selectedFiles}
            pathFolder="litter"
            onUploadComplete={handleUploadComplete}
            customButton={({ onUpload, overallUploadSuccess, fileNames }) => (
              <Button variant="primary" onClick={onUpload}>
                Upload Selected Files
              </Button>
            )}
          />
        )}

        {/* Display uploaded files */}
        {uploadedFiles.map((file, index) => (
          <p key={index}>{file.fileName}</p>
        ))}

        {!filesToBeUploaded && (
          <Button variant="primary" onClick={uploadMoreFiles}>
            Upload More Files
          </Button>
        )}
      </Form>
    </div>
  );
}