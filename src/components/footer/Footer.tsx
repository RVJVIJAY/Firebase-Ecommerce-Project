import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { GiBatMask } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-pink-500 text-gray-400 py-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo and Site Name */}
                <div className="flex items-center mb-4 md:mb-0">
                <GiBatMask className="w-10 h-10 text-white" />
                <span className="text-white text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>VJ-KART</span>

                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <Link to={`https://github.com/RVJVIJAY`} className="text-gray-400 hover:text-white">
                        <FaFacebook className="w-6 h-6" />
                    </Link>
                    <Link to={`https://github.com/RVJVIJAY`} className="text-gray-400 hover:text-white">
                        <FaGithub className="w-6 h-6" />
                    </Link>
                    <Link to={`https://www.instagram.com/v_i_j_a_y_______vj/?igsh=cTYyZGF5YmVxMDBv`} className="text-gray-400 hover:text-white">
                        <FaInstagram className="w-6 h-6" />
                    </Link>
                    <Link to={`https://www.linkedin.com/in/vj12/`} className="text-gray-400 hover:text-white">
                        <FaLinkedin className="w-6 h-6" />
                    </Link>
                </div>

                {/* Copyright Text */}
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} VJ-KART . All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
