import React, { useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import LoginWithGoogle from '../../myComponents/Auth/LoginWithGoogle.jsx'
import { Tabs, Tab } from "@nextui-org/tabs";
import { Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { login, signup } from '../../store/actions/authActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';


export default function Auth() {
    const auth = useSelector((store) => store.auth);

    // change page title
    useEffect(() => {
        document.title = "Authentication | CloudZilla"
    }, [])

    // if already logged in
    useEffect(() => {
        if (auth.status == true && auth.data != null) {
            return navigate("/home")
        }
    }, [auth.status, auth.data])


    const [selected, setSelected] = React.useState("login");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // handle signup
    const { register: signupRegister, handleSubmit: signupHandleSubmit, reset: signupFormReset } = useForm();
    async function handleSignupForm(data) {
        try {
            const response = await dispatch(signup(data));
            if (response.type == "signup/fulfilled") {
                toast.success(response.payload.message);
                return navigate("/home");
            } else {
                toast.error(response.payload.message);
                return;
            }
        } catch (error) {
            let { message = "Something Went Wrong" } = error;
            toast.error(message);
            return;
        }
    }

    // handle login
    const { register: loginRegister, handleSubmit: loginHandleSubmit, reset: loginFormReset } = useForm();
    async function handleLoginForm(data) {
        try {
            const response = await dispatch(login(data));
            if (response.type == "login/fulfilled") {
                toast.success(response.payload.message);
                return navigate("/home");
            } else {
                toast.error(response.payload.message);
                return;
            }
        } catch (error) {
            let { message = "Something Went Wrong" } = error;
            toast.error(message);
            return;
        }
    }


    return (
        <div className='pt-6 flex justify-center items-center flex-col'>
            <h1 className='mb-6 text-2xl font-semibold'>Authentication First</h1>
            <div className="flex flex-col">
                <Card className="max-w-full w-[340px] h-[400px]">
                    <CardBody className="overflow-hidden">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            <Tab key="login" title="Login">
                                <form onSubmit={loginHandleSubmit(handleLoginForm)} className="flex flex-col gap-4">
                                    <Input isRequired label="Email" {...loginRegister('email')} placeholder="Enter your email" type="email" />
                                    <Input
                                        isRequired
                                        label="Password"
                                        {...loginRegister('password')}
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                        Need to create an account?{" "}
                                        <Link size="sm" onPress={() => setSelected("sign-up")}>
                                            Sign up
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary" type='submit'>
                                            Login
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="sign-up" title="Sign up">
                                <form onSubmit={signupHandleSubmit(handleSignupForm)} className="flex flex-col gap-4 h-[300px]">
                                    <Input isRequired {...signupRegister('name')} label="Name" placeholder="Enter your name" type="text" />
                                    <Input isRequired {...signupRegister('email')} label="Email" placeholder="Enter your email" type="email" />
                                    <Input
                                        {...signupRegister('password')}
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                        Already have an account?{" "}
                                        <Link size="sm" onPress={() => setSelected("login")}>
                                            Login
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button type='submit' fullWidth color="primary">
                                            Sign up
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
            <span className='my-2'>OR</span>
            <div className="signin-with-google">
                <GoogleOAuthProvider clientId='70851154683-itn4ht8c52ognbpupa793qa3nsdvrpa4.apps.googleusercontent.com'>
                    <LoginWithGoogle />
                </GoogleOAuthProvider>
            </div>

        </div>
    )
}