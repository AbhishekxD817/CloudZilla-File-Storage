import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip, Button } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { api } from '../../api/api';

const Profile = () => {
    const auth = useSelector((store) => store.auth);
    const navigate = useNavigate();

    // title change
    useEffect(() => {
        document.title = 'Profile'
    }, [])

    // fetch my files data
    const [files, setFiles] = useState([]);
    const fetchFilesData = async () => {
        try {
            toast.info("Fetching My Files")
            const response = await api.get("/files");
            if (response && response.status == 200) {
                setFiles(response.data.files);
                return;
            }
            const { message = "Something went wrong while fetching files data" } = response.data;
            toast.error(message);
            return;
        } catch (error) {
            const { message = "Something went wrong while fetching files data" } = error.response.data;
            toast.error(message);
            return;
        }
    }

    useEffect(() => {
        (async function () {
            await fetchFilesData();
        })()
    }, [auth])





    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/files/${id}`);
            if (response && response.status == 200) {
                toast.success(response.data.message);
                await fetchFilesData();
                return;
            }
            const { message = "Something went wrong while deleting one file" } = response.data;
            toast.error(message);
            return;
        } catch (error) {
            const { message = "Something went wrong while deleting one file" } = error.response.data;
            toast.error(message);
            return;
        }

    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <User
                    name={auth.data?.name}
                    description={auth.data?.email}
                    avatarProps={{
                        src: auth.data?.avatar,
                        size: "lg",
                    }}
                    className="mb-4"
                />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">My Files</h2>
                <Table aria-label="Files table" className='max-h-96 overflow-hidden'>
                    <TableHeader>
                        <TableColumn>No.</TableColumn>
                        <TableColumn>FILE NAME</TableColumn>
                        <TableColumn>DIRECT URL</TableColumn>
                        <TableColumn>SHORT URL</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {files.map((file, idx) => (
                            <TableRow key={file._id}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{file.name}</TableCell>
                                <TableCell>
                                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {file.url}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a href={`http://localhost:5173/u/${file.shorten_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {`http://localhost:5173/u/${file.shorten_url}`}
                                    </a>
                                </TableCell>
                                <TableCell className='flex justify-center items-center'>
                                    <div className="flex items-center gap-4">
                                        <Tooltip color="danger" content="Delete file">
                                            <Button isIconOnly size="sm" variant="light" color='danger' onPress={() => handleDelete(file._id)}>
                                                <DeleteIcon />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function EditIcon() {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
        >
            <path
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
}

function DeleteIcon() {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
}

export default Profile











