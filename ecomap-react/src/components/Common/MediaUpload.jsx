import React, { useState, useEffect } from "react";
import supabase from '../../supabase.js';
import { v4 as uuidv4 } from 'uuid';

const MediaUpload = ({ selectedFiles, pathFolder, onUploadComplete, customButton }) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileResults, setFileResults] = useState([]);

  const handleUpload = async () => {
    if (selectedFiles && selectedFiles.length > 0 && supabase) {
      try {
        const uploadResults = [];

        for (const selectedFile of selectedFiles) {
          const fileExtension = getFileExtension(selectedFile.type);
          const newFileName = `${pathFolder}/${uuidv4()}${fileExtension}`;

          const { data, error } = await supabase.storage
            .from("ecomap")
            .upload(newFileName, selectedFile);

          const uploadResult = {
            fileName: selectedFile.name,
            uploadFileName: newFileName,
            uploadSuccess: !error,
          };

          if (error) {
            console.error(`Error uploading file: ${selectedFile.name}`, error.message);
            setUploadSuccess(false);
            setFileResults([]);
            return;
          }

          console.log("File uploaded. File path:", newFileName);
          uploadResults.push(uploadResult);
        }

        setUploadSuccess(true);
        setFileResults(uploadResults);

        onUploadComplete && onUploadComplete({
          overallUploadSuccess: uploadResults.every(result => result.uploadSuccess),
          fileResults: uploadResults,
        });
      } catch (error) {
        console.error("Error during file upload:", error.message);
        setUploadSuccess(false);
        setFileResults([]);
      }
    } else {
      console.error("No files selected or Supabase context not available.");
    }
  };

  const getFileExtension = (fileType) => {
    switch (fileType) {
      case 'image/png':
        return '.png';
      case 'image/jpeg':
        return '.jpeg';
      case 'image/jpg':
        return '.jpg';
      case 'video/mp4':
        return '.mp4';
      default:
        return '';
    }
  };

  return (
    <div>
      {customButton && customButton({
        onUpload: () => {
          handleUpload();
        },
        uploadSuccess,
        fileResults,
      })}
    </div>
  );
};

export default MediaUpload;