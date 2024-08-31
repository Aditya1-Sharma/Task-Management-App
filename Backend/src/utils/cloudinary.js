import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// Clodinary .cofig to make it outside of function
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "your-folder-name",
    });

    // await fs.unlink(localFilePath);
    return {
      url: uploadResult?.url,
    };
  } catch (error) {
    console.error(error);

    // await fs.unlink(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    throw new Error("Failed to upload file");
  } finally {
    await fs.unlink(localFilePath);
  }
};
