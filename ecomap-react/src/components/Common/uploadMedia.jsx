import React, { useState } from "react";
import supabase from '../../supabase.js'; 
import { v4 as uuidv4 } from 'uuid';

export default function UploadMedia({ selectedFile, pathFolder, customButton, onUploadComplete }) {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleUpload = async () => {
    if (selectedFile && supabase) {
      const fileExtension = getFileExtension(selectedFile.type);
      const newFileName = `${pathFolder}/${uuidv4()}${fileExtension}`;

      const { data, error } = await supabase.storage
        .from("ecomap")
        .upload(newFileName, selectedFile);

      if (error) {
        console.error(`Error uploading file: ${selectedFile.name}`, error.message);
        setUploadSuccess(false);
        setFileName(null);
        return;
      }

      console.log("File uploaded. File path:", newFileName);
      setUploadSuccess(true);
      setFileName(newFileName);

      onUploadComplete && onUploadComplete({
        uploadSuccess: true,
        fileName: newFileName,
      });
    } else {
      console.error("No file selected or Supabase context not available.");
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
        onUpload: handleUpload,
        uploadSuccess,
        fileName,
      })}
    </div>
  );
}
