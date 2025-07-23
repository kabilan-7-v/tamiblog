import React from "react";
import img from "../assets/image.png";

const Banner = () => {
  return (
    <div className="banner-container py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="text-center md:text-left md:w-3/4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">பழக்கவழக்கம்</h1>
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
            நல்ல பழக்கங்கள் - தொடர்ந்து செயல்படுத்தினால் - வழக்கமாக வேண்டும்.
            <br />
            பழக்கம் வழக்கமானால், வாழ்வில் வெற்றிகள் உறுதியாகும்.
            <div className="text-end mt-2 md:mt-3 mr-4 md:mr-40">-- ம.க.கு</div>
          </p>

          {/* Search bar */}
          <div className="flex w-full max-w-xl mx-auto md:mx-0">
            <input
              type="text"
              placeholder="வலைப்பதிவு தலைப்பு அல்லது முக்கிய சொல்"
              className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button className="px-3 md:px-4 py-2 md:py-3 bg-white border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-full text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="mt-8 md:mt-0">
          <div className="relative">
            <div className="absolute -z-10 w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] bg-blue-950 opacity-90 right-0"></div>
            <img
              src={img}
              alt="Person with laptop"
              // className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[450px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
