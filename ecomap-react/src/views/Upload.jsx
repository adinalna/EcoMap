import React, { useState } from "react";
import { Form, Button, ListGroup, Card, Table, Badge } from "react-bootstrap";
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
    console.log("Upload success 1:", fileResults[0].uploadSuccess);

    if (overallUploadSuccess) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...fileResults]);
      setFilesToBeUploaded(false);
      setShowUploadButton(false);

      // axiosClient.post('/upload', payload)
      // .then(({ data }) => {

      // })
      // .catch((err) => {
      //   const response = err.response;
      //   if (response && response.status === 422) {
      //     setErrors(response.data.message)
      //   }
      // })
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
    <div className="default-container" style={{ margin: "10px", }}>
      <h1>Upload Litter</h1>
      <Form>
        <Card className="custom-card"
          style={{ width: "715px", height: "500px", backgroundColor: "" }}>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
          {filesToBeUploaded && (
            <Button variant="dark" onClick={openFileDialog} style={{ width: "400px", height: "50px" }}>
              Select Media Files
            </Button>
          )}
          <Card body className="default-card" style={{ width: "600px", height: "400px", overflowY: 'auto', overflowX: 'hidden' }}>
            {/* Display selected files list */}
            {filesToBeUploaded && selectedFiles.length > 0 && (
              <Table>
                <tbody>
                  {selectedFiles.map((file, index) => (
                    <tr key={index} className="border-top">
                      <td style={{ width: '5%' }}>{`${index + 1}. `}</td>
                      <td style={{ width: '83%' }}>{file.name}</td>
                      <td style={{ width: '7%' }}>
                        <Button variant="danger" size="sm" onClick={() => removeFile(file)}>Remove</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <ListGroup>
              <Table>
                <tbody>
                  {uploadedFiles.map((file, index) => (
                      <tr key={index} className="border-top">
                        <td style={{ width: '5%' }}>{`${index + 1}. `}</td>
                        <td style={{ width: '95%' }}>{file.fileName}</td>
                        <td style={{ width: '5%' }}><Badge bg={file.uploadSuccess ? "success" : "danger"}>{file.uploadSuccess ? "Success" : "Failed"}</Badge></td>
                      </tr>
                  ))}
                </tbody>
              </Table>
            </ListGroup>
          </Card>
          {filesToBeUploaded && showUploadButton && selectedFiles.length > 0 && (
            <MediaUpload
              selectedFiles={selectedFiles}
              pathFolder="litter"
              onUploadComplete={handleUploadComplete}
              customButton={({ onUpload, overallUploadSuccess, fileNames }) => (
                <Button variant="success" onClick={onUpload}>
                  Upload Selected Files
                </Button>
              )}
            />
          )}

          {!filesToBeUploaded && (
            <Button variant="success" onClick={uploadMoreFiles}>
              Upload More Files
            </Button>
          )}
        </Card>
      </Form>
    </div>
  );
}