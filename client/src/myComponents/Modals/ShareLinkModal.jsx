import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React from 'react'
import { redirect, useNavigate } from "react-router-dom";

const ShareLinkModal = ({ onClose, open, file }) => {
    const navigate = useNavigate();


    return (
        <>
            <Modal isOpen={open} onOpenChange={onClose}
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{file ? file.name : "Modal"}</ModalHeader>
                            <ModalBody className="content-stretch">

                                <div>
                                    <p>
                                        <span className="font-bold">Direct Url - </span>                                   <a
                                            href={file?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline break-all"
                                        >
                                            {file ? file.url : "No Url"}
                                        </a>
                                    </p>
                                </div>
                                <div className="">
                                    <p>
                                        <span className="font-bold">Shorten Url - </span>
                                        <a
                                            href={`http://localhost:5173/u/${file.shorten_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline break-all"
                                        >
                                            {file ? `http://localhost:5173/u/${file.shorten_url}` : "No Url"}
                                        </a>
                                    </p>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={() => window.open(`http://localhost:5173/u/${file.shorten_url}`, "_blank", "noopener,noreferrer")}>
                                    Visit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}

export default ShareLinkModal