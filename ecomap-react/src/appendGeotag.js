import exifr from 'exifr';

const appendGeotag = async (uploads) => {
  try {
    const updatedUploads = await Promise.all(
      uploads.map(async (upload) => {
        const { file, fileType } = upload;
        let locationX = 0;
        let locationY = 0;

        if (fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') {

          const exifData = await exifr.parse(file);
          locationX = exifData?.longitude || 0;
          locationY = exifData?.latitude || 0;
        } else {

          locationX = 24.736328895884505;
          locationY = -32.17290205088275; 
        }

        return {
          ...upload,
          locationX: locationX,
          locationY: locationY,
        };
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
