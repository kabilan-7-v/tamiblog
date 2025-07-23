import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BaseUrl } from "../../api/Api";

const CategoryBlogs = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const blogsResponse = await axios.get(`${BaseUrl}/api/blogs`);
        let allBlogs = [];

        if (blogsResponse.data && Array.isArray(blogsResponse.data.data)) {
          allBlogs = blogsResponse.data.data;
        } else if (blogsResponse.data?.blogs) {
          allBlogs = blogsResponse.data.blogs;
        }

        const categoriesResponse = await axios.get(
          `${BaseUrl}/api/public/categories`
        );
        if (
          categoriesResponse.data &&
          Array.isArray(categoriesResponse.data.data)
        ) {
          const allCategories = categoriesResponse.data.data;

          const category = allCategories.find((cat) => cat._id === id);
          setCurrentCategory(category);

          const usedCategoryNames = new Set();
          allBlogs.forEach((blog) => {
            if (blog.category) {
              usedCategoryNames.add(blog.category);
            }
          });

          const filteredCategories = allCategories.filter((category) =>
            usedCategoryNames.has(category.name)
          );

          setAvailableCategories(filteredCategories);
        }

        const categoryName = currentCategory?.name;
        const filteredBlogs = categoryName
          ? allBlogs.filter((blog) => blog.category === categoryName)
          : [];

        setBlogs(filteredBlogs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentCategory?.name]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          {currentCategory ? currentCategory.name : "தன்மைப்பிக்கை"}
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-600 mt-2">
          {currentCategory?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."}
        </p>
        <div className="flex justify-center mt-3 sm:mt-4">
          <div className="flex items-center text-xs sm:text-sm">
            <Link to="/blog" className="text-gray-500 hover:text-gray-700">
              வகைப்பிரிவு
            </Link>
            <span className="mx-2">|</span>
            <span className="text-blue-600">
              {currentCategory?.name || "தன்மைப்பிக்கை"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content with Blogs and Categories */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Left Side - Blog List */}
        <div className="w-full lg:w-2/3">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="w-full md:w-1/3 h-48 sm:h-64 bg-gray-100">
                    {blog.content && blog.content.includes("<img") ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: extractImageTag(blog.content),
                        }}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">
                          No image available
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-2/3 p-4 sm:p-6 flex flex-col">
                    <div className="text-sm text-blue-600 mb-2">
                      {blog.category || "தலைப்பு இல்லை"}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                      {blog.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 flex-grow">
                      {stripHtmlTags(blog.content)?.substring(0, 150)}...
                    </p>

                    <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                     {blog.date}
                    </div>

                    <Link
                      to={`/blogs/${blog._id}/${blog.link}}`}
                      state={{ post: blog }}
                      className="bg-gray-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-gray-700 transition self-start text-xs sm:text-sm"
                    >
                      மேலும் படிக்கவும்
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">இந்த வகையில் இடுகைகள் இல்லை</p>
            </div>
          )}
        </div>

        {/* Right Side - Categories */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">
              வகைகள்
            </h3>

            {availableCategories.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {availableCategories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category._id}`}
                    className={`flex items-center p-2 sm:p-3 border rounded-lg transition ${
                      category._id === id
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mr-3 sm:mr-4">
                      {category.icon && (
                        <img
                          src={`${BaseUrl}${category.icon}`}
                          alt={category.name}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm sm:text-base">
                        {category.name}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No categories available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function extractImageTag(htmlContent) {
  if (!htmlContent) return "";

  const imgRegex = /<img[^>]+>/;
  const match = htmlContent.match(imgRegex);

  if (match) {
    return match[0].replace("<img", '<img class="w-full h-full object-cover"');
  }

  return "";
}

function stripHtmlTags(htmlContent) {
  if (!htmlContent) return "";
  return htmlContent.replace(/<[^>]*>/g, "");
}

export default CategoryBlogs;
