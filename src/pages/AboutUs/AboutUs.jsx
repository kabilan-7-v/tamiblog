import React from "react";
import friends from "./assets/Friends.png";
import team from "./assets/Team.png";
import community from "./assets/Community.png";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative">
        <div className="h-[300px] sm:h-[400px] md:h-[500px] w-full mt-[520px] sm:mt-[240px] md:mt-[200px] pt-5">
          <img
            src={friends}
            alt="People looking at Eiffel Tower"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-[-520px] sm:top-[-240px] md:top-[-200px] left-0 right-0 z-10">
          <div className="flex flex-col md:flex-row bg-white p-6 sm:p-10 md:p-14 mx-4 sm:mx-10 mt-0 gap-6 md:gap-14 rounded-br-lg shadow-xl">
            <div>
              <h2 className="text-lg font-medium mb-3 text-gray-700">
                எங்களைப்பற்றி
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-6 text-gray-800">
                நாங்கள் தமிழகத் தற்றல்களைப் பகிர்ந்து கொள்ளும் உள்ளடக்க
                எழுத்தாளர்களின் சமூகம்.
              </p>
            </div>
            <div className="text-sm flex flex-col justify-center items-center text-gray-600 space-y-5 mt-4">
              <p>
                தமிழகத்தில் கலைகளைச் சொல்லிக்கொடுக்கிறோம் - அதேசமயம் தமிழ்க்கலை
                நெடுங்காலம்கொண்டதே என்று சொல்லுகிறோம்!
              </p>
              <p>
                மாணவரும் தமிழாசிரியர் கவிஞர் நடிகர்கள் வளைக்கரைஞர்கள் - அதேசமயம்
              </p>
              <p>கல்வியை வற்புறுத்தாமல் மகிழ்ச்சியை நல்பயன் சொல்லுகிறோம்!</p>
            </div>
          </div>
        </div>

        <div className="absolute max-w-xl bottom-6 left-4 sm:left-20 right-4 sm:right-0 bg-[#FFD050] py-4 px-4 sm:px-8 flex justify-between">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">12+</h3>
            <p className="text-xs sm:text-sm">Blogs Published</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">18K+</h3>
            <p className="text-xs sm:text-sm">Views on Palakkavakkam</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">30K+</h3>
            <p className="text-xs sm:text-sm">Total active Users</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-[#F4F0F8] mb-20">
        <div className="p-6 sm:p-8 m-4 sm:m-10 mt-4 mb-6">
          <h2 className="text-lg font-medium mb-3 text-gray-700">
            எங்களைப்பற்றி
          </h2>
          <p className="text-lg mb-4 text-gray-800">
            நாங்கள் தமிழகத் தற்றல்களைப் பகிர்ந்து கொள்ளும் உள்ளடக்க
            எழுத்தாளர்களின் சமூகம்.
          </p>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="p-6 sm:p-8 m-4 sm:m-10 mt-4 mb-6">
          <h2 className="text-lg font-medium mb-3 text-gray-700">எங்கள் பணி</h2>
          <p className="text-lg mb-4 text-gray-800">
            உலகெங்கிலும் உள்ள படைப்பாளிகளுக்கு மகிழ்பூட்டக்க உள்ளடக்கத்தை
            உருவாக்குதல்.
          </p>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className="gap-0 mb-20 px-4">
        <div className="relative flex flex-col md:flex-row mb-16">
          <div className="relative w-full md:w-1/2">
            <img
              src={team}
              alt="Team hands together"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 bg-[#FFD050] rounded-full transform translate-x-1/3 translate-y-1/3"></div>
          </div>
          <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-center gap-4 mt-6 md:mt-0">
            <h2 className="text-xl sm:text-2xl font-medium mb-3 text-gray-800">
              எங்கள் படைப்பாளிகள் குழு
            </h2>
            <div className="text-sm text-gray-600 space-y-4">
              <p>
                தேவைப்படுவோருக்கு முடிக்கவரை தாகம் கொடுக்கச் சொல்கிறோம் -
                அதேசமயம் எப்போதும் வாரிட்டும் இசைகளை பெற வேண்டாம் என்கிறோம்.
              </p>
              <p>
                தேவைப்படுவோருக்கு முடிக்கவரை தாகம் கொடுக்கச் சொல்கிறோம் -
                அதேசமயம் எப்போதும் வாரிட்டும் இசைகளை பெற வேண்டாம் என்கிறோம்.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col md:flex-row">
          <div className="p-6 sm:p-8 md:w-1/2 order-2 md:order-1 flex flex-col justify-center gap-4 mt-6 md:mt-0">
            <h2 className="text-xl sm:text-2xl font-medium mb-3 text-gray-800">
              இந்த வலைப்பதிவை ஏன் தொடங்கினோம்
            </h2>
            <div className="text-sm text-gray-600 space-y-4">
              <p>
                தேவைப்படுவோருக்கு முடிக்கவரை தாகம் கொடுக்கச் சொல்கிறோம் -
                அதேசமயம் எப்போதும் வாரிட்டும் இசைகளை பெற வேண்டாம் என்கிறோம்.
              </p>
              <p>
                தேவைப்படுவோருக்கு முடிக்கவரை தாகம் கொடுக்கச் சொல்கிறோம் -
                அதேசமயம் எப்போதும் வாரிட்டும் இசைகளை பெற வேண்டாம் என்கிறோம்.
              </p>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 order-1 md:order-2">
            <img
              src={community}
              alt="Team members sitting"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 bg-[#FFD050] rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
