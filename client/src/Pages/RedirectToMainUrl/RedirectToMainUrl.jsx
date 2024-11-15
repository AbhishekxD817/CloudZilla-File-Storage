import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { api } from '../../api/api';

function Loader() {
    return (
        <div className='flex min-h-screen justify-center items-center'>
            <Spinner />
        </div>
    );
}

const RedirectToMainUrl = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            return navigate('/home')
        }
    }, [error])

    const { shorten_url } = useParams();

    const getUrlData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/files/info?shorten_url=${shorten_url}`);
            setLoading(false);
            if (response && response.status == 200) {
                toast.info("Please wait while redirecting...")
                window.location.href = response.data.url;
                return;
            }
            const { message } = response.data;
            toast.error(message);
            setError(message ? message : "error");
            return;
        } catch (error) {
            setLoading(false);
            const { message = "Something went wrong, Or No Redirect Url Exists" } = error.response.data;
            setError(message ? message : "error");
            toast.error(message);
            return;
        }
    }

    useEffect(() => {
        document.title = 'Please Wait...';
        
        (async function () {
            await getUrlData();
        })()
    }, [])

    return (
        <>
            {loading && <Loader />}
        </>
    )
}

export default RedirectToMainUrl