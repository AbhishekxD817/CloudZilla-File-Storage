import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-black mt-1 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">CloudZilla</h3>
                        <p className="text-gray-400">Quick, easy, and secure file sharing for everyone.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                            <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
                        <p className="text-gray-400">support@CloudZilla.com</p>
                        <p className="text-gray-400">1-800-FILE-SHARE</p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; 2023 CloudZilla. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer