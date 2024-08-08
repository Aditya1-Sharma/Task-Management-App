import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Clodinary .cofig to make it outside of function

const uploadOnCloudinary = async (localFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);
    return uploadResult;
  } catch (error) {
    console.error(error);

    // fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  } finally {
    fs.unlink(localFilePath);
    return null;
  }
};
