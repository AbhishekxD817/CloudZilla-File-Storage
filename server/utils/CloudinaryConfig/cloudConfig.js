import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET
})



const uploadFileToCloud = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto', 
            type: "upload"
        });
        return result;
    } catch (error) {
        throw new Error(`File upload failed: ${error.message}`);
    }
};





export default uploadFileToCloud;