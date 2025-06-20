import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 p-6 md:p-20 bg-[#F4F0F8]">
      {/* Left Section */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-purple-600"></div>
          <h2 className="text-lg font-semibold">எங்களைப் பற்றி</h2>
        </div>
        <p className="text-lg mb-4">
          நாங்கள் தங்கள் கற்றல்களைப் பகிர்ந்து கொள்ளும் உள்ளடக்க எழுத்தாளர்களின்
          சமூகம்.
        </p>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link to="/about" className="text-purple-600 font-medium">
          Read More &gt;
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex-1 mt-8 md:mt-0">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-purple-600"></div>
          <h2 className="text-lg font-semibold">எங்கள் பணி</h2>
        </div>
        <p className="text-lg mb-4">
          உலகெங்கிலும் உள்ள படைப்பாளிகளுக்கு மதிப்பளிக்க உள்ளடக்கத்தை
          உருவாக்குதல்.
        </p>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default About;
