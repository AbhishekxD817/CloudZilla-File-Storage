import uploadFileToCloud from '../utils/CloudinaryConfig/cloudConfig.js';
import AppError from '../utils/ErrorHandlers/AppError.js'
import File from '../models/fileModel.js'
import { nanoid } from 'nanoid'


export const newFileHandler = async (req, res, next) => {
    if (!req.files || !req.files.file) {
        return next(new AppError(400, "No file uploaded"));
    }

    let result;
    try {
        result = await uploadFileToCloud(req.files.file.path);
    } catch (error) {
        const { message = "Error Occured While Uploading File To Cloud" } = error;
        return next(new AppError(500, message));
    }

    const { secure_url } = result;
    const shorten_url = `${nanoid(9)}.${result.format}`;

    const newFile = await new File({
        owner: req.currentUser._id,
        url: secure_url,
        shorten_url: shorten_url,
        name: req.files.file.name ? req.files.file.name : 'no name'
    })

    await newFile.save();
    // new file uploaded


    // now push it to currentUser.files
    req.currentUser.files.push(newFile._id);
    await req.currentUser.save();


    return res.json({
        message: `File: ${req.files.file.name}, Uploaded Successfully`,
        file: newFile
    })

}

export const getDirectUrl = async (req, res, next) => {
    const { shorten_url } = req.query;

    let file = await File.findOne({ shorten_url });
    if (!file) {
        return next(new AppError(404, "No Direct URL Exists"))
    }
    return res.json({
        url: file.url
    })
}


export const myFilesData = async (req, res, next) => {
    return res.json({
        files: req.currentUser.files
    })
}

export const deleteFile = async (req, res, next) => {
    let { id } = req.params;
    let deletedFile = await File.findByIdAndDelete(id);

    let idxOfDeletedFile = req.currentUser.files.indexOf(deleteFile._id);
    if(idxOfDeletedFile > -1){
        req.currentUser.files.splice(idxOfDeletedFile,1);
        await req.currentUser.save();
    }

    
    return res.json({
        message: `File: ${deletedFile.name}, Deleted Successfull`,
        file: deletedFile
    })
}