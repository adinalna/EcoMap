import React, { useState } from "react";
import { Form, Button, ListGroup, Card, Table, Badge, Nav } from "react-bootstrap";
import MediaUpload from "../components/Common/MediaUpload.jsx";
import axiosClient from "../axios-client.js";
import { Upload as UploadIcon, Images } from 'react-bootstrap-icons'
import checkGeotag from "../checkGeotag.js";
import appendGeotag from "../appendGeotag.js";

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

  const handlePreUpload = async (onUpload) => {
    try {
      const geotagChecks = await Promise.all(selectedFiles.map(checkGeotag));
      const allFilesGeotagged = geotagChecks.every((result) => result);

      if (allFilesGeotagged) {
        onUpload();
      } else {
        alert("Please make sure all selected files are geotagged before uploading.");
      }
    } catch (error) {
      console.error("Error checking geotags:", error.message);
    }
  };

  const handleUploadComplete = async ({ overallUploadSuccess, fileResults }) => {
    console.log("Upload success:", overallUploadSuccess);

    setFilesToBeUploaded(false);
    setShowUploadButton(false);

    const successfulUploads = fileResults.filter((fileResult) => fileResult.uploadSuccess);

    const geotaggedUploads = await appendGeotag(successfulUploads);

    console.log("geotaggedUploads", geotaggedUploads);

    setUploadedFiles(fileResults);

    if (geotaggedUploads.length > 0) {
      const payload = geotaggedUploads.map((upload) => ({
        path: upload.uploadFileName,
        mediaType: upload.fileType,
        locationX: upload.locationX,
        locationY: upload.locationY,
      }));      

      console.log("payload", payload);
    }
  };

  const openFileDialog = () => {
    document.getElementById("fileInput").click();
  };

  const uploadMoreFiles = () => {
    setSelectedFiles([]);
    setUploadedFiles([])
    setFilesToBeUploaded(true);
    setShowUploadButton(true);
  };

  return (
    <div className="default-container" style={{ margin: "15px", }}>
      <h1>Upload Media</h1>
      <Form>
        <Card className="custom-card"
          style={{ width: "715px", height: "450px", backgroundColor: "" }}>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
          {filesToBeUploaded && (
            <Button variant="dark" onClick={openFileDialog} style={{ width: "400px", height: "50px" }}>
              Select Media Files <Images className="ml-4" size={18} />
            </Button>
          )}
          <Card body className="default-card" style={{ width: "600px", height: "350px", overflowY: 'auto', overflowX: 'hidden' }}>
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
              customButton={({ onPreUpload, onUpload }) => (
                <Button
                  variant="success"
                  onClick={() => (onPreUpload ? onPreUpload(onUpload) : onUpload())}
                >
                  Upload Selected Files <UploadIcon className="ml-4" size={18} />
                </Button>
              )}
              onPreUpload={handlePreUpload}
            />
          )}

          {!filesToBeUploaded && (
            <Button variant="success" onClick={uploadMoreFiles}>
              Upload More Files
            </Button>
          )}
        </Card>
      </Form>
      <Nav.Link className="me-2" href="/litter">
        <Button variant="dark" style={{ margin: "30px 0px", height: "60px", width: "300px" }}>
          Tag Your Litters Here !
        </Button>
      </Nav.Link>
    </div>
  );
}