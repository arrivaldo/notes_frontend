// frontend/src/components/Hero.jsx

import React from "react";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";
import { useAuth } from "../context/ContextProvider"; // Import useAuth
import { motion } from "framer-motion";
import Footer from "./Footer";

const Hero = () => {
    const { user } = useAuth(); // Get user from context

    return (
        <>
            <Navbar2 />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full h-[50vh] flex items-center justify-center">
                    <motion.div
                        className="text-center text-white"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl font-bold">Your Notes, Organized</h1>
                        <p className="mt-4 text-lg">Take control of your thoughts with our intuitive Notes app.</p>
                        <Link to={user ? "/home" : "/login"}> {/* Conditional link */}
                            <motion.button
                                className="mt-6 px-8 py-3 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                Get Started
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* Testimonials Section */}
                <div className="bg-gray-100 w-full flex-grow flex flex-col items-center justify-center py-12">
                    <h2 className="text-center text-3xl font-bold text-gray-800">What Our Users Say</h2>
                    <div className="flex flex-wrap justify-center mt-8 gap-6">
                        <motion.div
                            className="bg-white shadow-lg rounded-lg p-6 max-w-xs"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-gray-600">"This app has changed the way I organize my notes!"</p>
                            <p className="mt-4 font-semibold">- Alex R.</p>
                        </motion.div>

                        <motion.div
                            className="bg-white shadow-lg rounded-lg p-6 max-w-xs"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-gray-600">"I love the simplicity and the design of this app!"</p>
                            <p className="mt-4 font-semibold">- Paulo S.</p>
                        </motion.div>

                        <motion.div
                            className="bg-white shadow-lg rounded-lg p-6 max-w-xs"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-gray-600">"I like this more than Keep, hope new features coming!"</p>
                            <p className="mt-4 font-semibold">- Juan V.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Section */}
              <Footer />
            </div>
        </>
    );
};

export default Hero;
