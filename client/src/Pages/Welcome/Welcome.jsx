import React, { useEffect } from 'react'
import { Upload, Share2, Shield, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Welcome() {
    const auth = useSelector((store)=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        document.title = "CloudZilla"
    },[])

    useEffect(()=>{
        if(auth.status == true && auth.data != null){
            return navigate("/home")
        }
    },[auth.status,auth.data])

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-white to-gray-100 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Share Files Instantly, <span className="text-primary">Securely</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Upload any file - images, videos, documents, or archives. Get a shareable link instantly. It's that simple!
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button as={Link} to='/home' size="lg" className="w-full sm:w-auto bg-black text-white">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button variant="" size="lg" className="w-full sm:w-auto">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Why Choose CloudZilla?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Zap className="w-12 h-12 text-blue-500" />}
                                title="Lightning Fast"
                                description="Upload and share your files in seconds, not minutes."
                            />
                            <FeatureCard
                                icon={<Shield className="w-12 h-12 text-blue-500" />}
                                title="Secure Sharing"
                                description="Your files are encrypted and protected during transfer."
                            />
                            <FeatureCard
                                icon={<Share2 className="w-12 h-12 text-blue-500" />}
                                title="Easy to Share"
                                description="Get a simple link to share your files with anyone, anywhere."
                            />
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-16 px-4">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            How It Works
                        </h2>
                        <div className="max-w-3xl mx-auto">
                            <ol className="relative border-l border-gray-200">
                                <Step
                                    number={1}
                                    title="Upload Your File"
                                    description="Select any file from your device - images, videos, documents, or archives."
                                />
                                <Step
                                    number={2}
                                    title="Get Your Link"
                                    description="Once uploaded, you'll receive a unique, shareable link for your file."
                                />
                                <Step
                                    number={3}
                                    title="Share with Anyone"
                                    description="Send the link to friends, family, or colleagues. They can access your file instantly."
                                />
                            </ol>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 text-white bg-black">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Start Sharing?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Join thousands of users who trust CloudZilla for quick, secure file sharing. No credit card required.
                        </p>
                        <Button as={Link} to={'/auth'} size="lg" variant="ghost" color="ghost" className='bg-white text-black'>
                            Create Free Account
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

function Step({ number, title, description }) {
    return (
        <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full -left-4 ring-4 ring-white">
                <span className="text-white font-bold">{number}</span>
            </span>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </li>
    )
}