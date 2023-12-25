import exifr from 'exifr';

const checkGeotag = async (file) => {
  try {
    // Read EXIF data using exifr
    const exifData = await exifr.parse(file);

    // Check if the EXIF data contains GPS information
    const hasGeotag = !!exifData?.latitude && !!exifData?.longitude;

    return hasGeotag;
  } catch (error) {
    console.error("Error reading EXIF data:", error);
    throw error;
  }
};

export default checkGeotag;