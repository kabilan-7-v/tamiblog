import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../../api/Api";

const Categories = ({ availableCategories }) => {
  const categoriesContainerRef = useRef(null);

  const scrollCategories = (direction) => {
    const container = categoriesContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const currentScroll = container.scrollLeft;

    if (direction === "left") {
      container.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      });
    } else {
      container.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-6 sm:mt-0 mb-12 bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">அனைத்து வகைகளும்</h2>

      {availableCategories.length > 0 ? (
        <div className="relative px-2 sm:px-10">
          {availableCategories.length >= 5 && (
            <button
              onClick={() => scrollCategories("left")}
              className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md z-10"
              aria-label="Scroll left"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          <div
            className="flex space-x-4 overflow-x-auto sm:overflow-hidden scroll-smooth pb-4 sm:pb-0"
            ref={categoriesContainerRef}
          >
            {availableCategories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="flex flex-col p-4 sm:p-6 border rounded-lg hover:bg-gray-50 transition min-w-[200px] sm:min-w-[280px] max-w-[200px] sm:max-w-[280px]"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3">
                  {category.icon && (
                    <img
                      src={`${BaseUrl}${category.icon}`}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h4 className="font-medium text-sm sm:text-base">{category.name}</h4>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {availableCategories.length >= 5 && (
            <button
              onClick={() => scrollCategories("right")}
              className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow-md z-10"
              aria-label="Scroll right"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default Categories;
