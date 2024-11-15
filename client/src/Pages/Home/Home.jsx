import React, { useEffect, useState } from 'react'
import { Upload, Link, File, Image, Video, FileArchive } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/button'
import { useForm } from 'react-hook-form'
import { api } from '../../api/api.js'
import ProgressBar from '../../myComponents/ProgressBar/ProgressBar.jsx'
import ShareLinkModal from '../../myComponents/Modals/ShareLinkModal.jsx'

const FileTypeIcon = ({ type }) => {
    switch (type) {
        case 'image':
            return <Image className="w-6 h-6" />
        case 'video':
            return <Video className="w-6 h-6" />
        case 'pdf':
            return <File className="w-6 h-6" />
        case 'zip':
            return <FileArchive className="w-6 h-6" />
        default:
            return <File className="w-6 h-6" />
    }
}

const Home = () => {
    const auth = useSelector((store) => store.auth);
    const navigate = useNavigate();

    // change title
    useEffect(() => {
        document.title = "Home | CloudZilla"
    }, [])


    // Authentication Required
    useEffect(() => {
        if (auth.status == false && auth.data == null) {
            toast.info("Authentication Required")
            return navigate("/auth");
        }
    }, [auth.status, auth.data])




    const [file, setFile] = useState(null)

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
    }


    // form handle
    const [loading, setLoading] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { handleSubmit, reset, register } = useForm();

    const handleUploadForm = async (data) => {
        try {
            setLoading(true);

            let formData = new FormData();
            formData.append('file', data.file[0]);

            const response = await api.post("/files/upload", formData);
            setLoading(false);

            if (response && response.status == 200) {
                toast.success(response.data.message);
                setFileData(response.data.file);
                setIsModalOpen(true);
                setFile(null);
                return;
            }
            toast.error("Please try again later");
            return;

        } catch (error) {
            setLoading(false);
            const { message = "Some Error Occurred While Uploading Image" } = error.response.data;
            toast.error(message);
            return;
        }
    }

    return (
        <>
            <ShareLinkModal
                open={isModalOpen}
                onClose={(e) => setIsModalOpen(false)}
                file={fileData}
            />
            {
                loading === true && <ProgressBar />
            }
            <div className="mt-6 flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Upload and Share Your Files</h1>

                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">

                    {/* image form */}
                    <form onSubmit={handleSubmit(handleUploadForm)}>
                        <div className="p-6">
                            <div className="mb-4">
                                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                                    Choose a file to upload
                                </label>
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <span>Upload a file</span>

                                                {/* input */}
                                                <input {...register("file")} id="file-upload" name="file" type="file" className="sr-only" onChange={handleFileChange} />


                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Image, Video, PDF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {file && (
                                <div className="mt-4">
                                    <div className="flex items-center space-x-2">
                                        <FileTypeIcon type={file.type.split('/')[0]} />
                                        <span className="text-sm text-gray-500">{file.name}</span>
                                    </div>
                                    <Button type='submit'
                                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                    >
                                        Upload and Get Link
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home