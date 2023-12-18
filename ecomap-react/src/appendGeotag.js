import exifr from 'exifr';

const appendGeotag = async (uploads) => {
  try {
    const updatedUploads = await Promise.all(
      uploads.map(async (upload) => {
        const { file } = upload;
        const exifData = await exifr.parse(file);
        const updatedUpload = {
          ...upload,
          locationX: exifData?.longitude || 0,
          locationY: exifData?.latitude || 0,
        };
        return updatedUpload;
      })
    );
    console.log("updatedUploads", updatedUploads);
    return updatedUploads;
  } catch (error) {
    console.error('Error appending geotagging:', error.message);
    throw error;
  }
};

export default appendGeotag;
