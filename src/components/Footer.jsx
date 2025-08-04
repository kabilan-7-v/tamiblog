import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { BaseUrl } from "../api/Api";

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BaseUrl}/api/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subscriberId: 999 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }
      const response1 = await fetch(`${BaseUrl}/api/mail/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email, // Change this
          subject: "🎉 Welcome to Our Newsletter!",
          message: `Hi there,

Thank you for subscribing to our newsletter! 🎊

We're excited to have you with us. You'll now receive updates on our latest news, features, and more.


Stay tuned and welcome aboard!

Best regards,
The Team`,
        }),
      });

      setMessage("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      setMessage(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#232536] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Navigation links with title */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-yellow-400 text-xl font-bold mb-6 md:mb-0">
            பழக்கவழக்கம்
          </h2>
          <></>
          <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
            <Link
              to="/"
              className="hover:text-[#FFD700] text-left md:text-center pl-4 md:pl-0"
            >
              முகப்பு
            </Link>
            <Link
              to="/blog"
              className="hover:text-[#FFD700] text-left md:text-center pl-4 md:pl-0"
            >
              வலைப்பதிவு
            </Link>
            <Link
              to="/about"
              className="hover:text-[#FFD700] text-left md:text-center pl-4 md:pl-0"
            >
              எங்களைப் பற்றி
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#FFD700] text-left md:text-center pl-4 md:pl-0"
            >
              தொடர்புக்கு
            </Link>
            <Link
              to="/articles"
              className="hover:text-[#FFD700] text-left md:text-center pl-4 md:pl-0"
            >
              கட்டுரைகள்
            </Link>
            <Link
              to="/privacy"
              className="hover:text-[#FFD700] text-left md:text-center pl-4 md:pl-0"
            >
              தனியுரிமைக் கொள்கை
            </Link>
          </div>
        </div>

        {/* Main footer content - single line */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 max-w-6xl mx-auto bg-gray-600 rounded-lg m-2 md:m-10 p-6 md:p-14 opacity-50">
          <p className="mb-6 md:mb-0 md:w-1/2 md:pr-4 text-center md:text-left">
            சமீபத்திய புதுப்பிப்புகள் மற்றும் செய்திகளைப் பெற எங்கள்
            செய்திமடலுக்கு குழுசேரவும்
          </p>

          {/* Subscription form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col w-full md:w-auto"
          >
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-gray-800 text-white px-4 py-3 rounded-l w-full md:w-64"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-yellow-400 text-gray-900 px-4 py-3 rounded-r font-medium whitespace-nowrap"
                disabled={isLoading}
              >
                {isLoading ? "..." : "பதிவு"}
              </button>
            </div>
            {message && (
              <p
                className={`mt-2 text-sm ${
                  message.includes("Success")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Bottom section with contact info and social media */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="mb-2">Palakkavalakkam 641 001 Coimbatore</p>
            <p>palakkavalakkam@gmail.com</p>
          </div>

          {/* Social media icons */}
          <div className="flex space-x-8 mt-2 md:mt-0">
            <a
              href="https://www.facebook.com/Palakkavalakkam/"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/palakkavalakkam"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaTwitter />
            </a>
            {/* <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">
              <FaLinkedinIn />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
