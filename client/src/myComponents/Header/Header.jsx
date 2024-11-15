import { Button } from '@nextui-org/button'
import { Cloud, CloudCog, CloudLightning, File, Upload } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../store/actions/authActions.js'
import { toast } from 'react-toastify'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from '@nextui-org/react'

const Header = () => {
    const status = useSelector((store) => store.auth.status);
    const data = useSelector((store) => store.auth.data);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutBtn = async () => {
        try {
            const res = await dispatch(logout());
            if (res.type == "logout/fulfilled") {
                toast.success(res.payload.message);
                return navigate("/")
            } else {
                toast.error(res.payload.message);
                return;
            }
        } catch (error) {
            const { message = "Something went wrong while logout" } = error;
            toast.error(message);
            return;
        }
    }

    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <CloudLightning className="w-8 h-8 text-blue-500" />
                    <span className="text-xl font-bold text-gray-800"><Link to={'/'}>CloudZilla</Link></span>
                </div>
                <div className="hidden md:flex space-x-4">
                    <a href="#features" className="text-gray-600 hover:text-blue-500">Features</a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-blue-500">How It Works</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">About</a>
                </div>
                {
                    status == false ?
                        <Button as={Link} to={'/home'} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Get Started
                        </Button>
                        :
                        <>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">{data.name}</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings" as={Link} to={`/profile`}>
                                        My Profile
                                    </DropdownItem>
                                    <DropdownItem onClick={handleLogoutBtn} variant='shadow' key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                }
            </nav>
        </header>
    )
}

export default Header