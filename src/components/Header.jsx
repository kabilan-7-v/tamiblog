import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#232536] py-5 sticky top-0 z-50">
      <nav className="mx-auto px-4 sm:px-6 md:px-10 lg:px-20 flex justify-between items-center">
        <div className="text-[#FBEC25] text-xl font-bold">பழக்கவழக்கம்</div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-white">
          <Link
            to="/"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/" ? "text-[#FFD700]" : ""
            }`}
          >
            முகப்பு
          </Link>
          <Link
            to="/blog"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/blog" ? "text-[#FFD700]" : ""
            }`}
          >
            வலைப்பதிவு
          </Link>
          <Link
            to="/about"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/about" ? "text-[#FFD700]" : ""
            }`}
          >
            எங்களைப் பற்றி
          </Link>
          <Link
            to="/contact"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/contact" ? "text-[#FFD700]" : ""
            }`}
          >
            தொடர்புக்கு
          </Link>
          <Link
            to="/articles"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/articles" ? "text-[#FFD700]" : ""
            }`}
          >
            கட்டுரைகள்
          </Link>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#232536] py-4 px-4 flex flex-col justify-center items-end gap-4 text-white">
          <Link
            to="/"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/" ? "text-[#FFD700]" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            முகப்பு
          </Link>
          <Link
            to="/blog"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/blog" ? "text-[#FFD700]" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            வலைப்பதிவு
          </Link>
          <Link
            to="/about"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/about" ? "text-[#FFD700]" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            எங்களைப் பற்றி
          </Link>
          <Link
            to="/contact"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/contact" ? "text-[#FFD700]" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            தொடர்புக்கு
          </Link>
          <Link
            to="/articles"
            className={`hover:text-[#FFD700] ${
              location.pathname === "/articles" ? "text-[#FFD700]" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            கட்டுரைகள்
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
