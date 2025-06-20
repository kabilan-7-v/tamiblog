import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../../api/Api";

const HomeBlog = () => {
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/blogs`);
        let blogsData = [];

        if (response.data && Array.isArray(response.data.data)) {
          blogsData = response.data.data;
        } else if (response.data?.blogs) {
          blogsData = response.data.blogs;
        }

        if (blogsData.length > 0) {
          // Set the first blog as featured
          setFeaturedBlog(blogsData[0]);
          // Set the rest as regular blogs
          setBlogs(blogsData.slice(1));
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to fetch blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!featuredBlog)
    return <div className="text-center py-10">No blogs found</div>;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 pb-0">
      <div className="flex justify-between items-center mb-0">
        <h1 className="text-xl sm:text-2xl font-bold">சிறப்பு இடுகை</h1>
        <Link to="/blog" className="text-blue-600 hover:underline text-sm sm:text-base">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 py-6 sm:py-10">
          <div className="bg-[#F4F0F8] rounded-lg overflow-hidden flex items-center justify-center">
            {featuredBlog.content && featuredBlog.content.includes("<img") ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: extractImageTag(featuredBlog.content),
                }}
                className="w-full h-48 sm:h-64 object-cover"
              />
            ) : (
              <div className="w-full h-48 sm:h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-2 py-4 sm:py-6">
            <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              By {featuredBlog.author?.authorName} |{" "}
              {formatDate(featuredBlog.createdAt)}
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">"{featuredBlog.title}"</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
              {stripHtmlTags(featuredBlog.content)?.substring(0, 120)}...
            </p>
            <Link
              to={`/blogs/${featuredBlog._id}/${encodeURIComponent(
                featuredBlog.title.replace(/\s+/g, "-").toLowerCase()
              )}`}
              className="bg-gray-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-gray-700 transition self-start text-xs sm:text-sm"
            >
              மேலும் படிக்கவும்
            </Link>
          </div>
        </div>

        <div className="md:col-span-1 bg-[#F4F0F8] p-3 sm:p-4 rounded-lg">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">All Posts</h3>
          <div className="space-y-3 sm:space-y-4">
            {blogs.slice(0, 3).map((blog) => (
              <div key={blog._id} className="border-b pb-3 sm:pb-4">
                <div className="text-xs text-gray-600 mb-1">
                  By {blog.author?.authorName} | {formatDate(blog.createdAt)}
                </div>
                <Link
                  to={`/blogs/${blog._id}/${encodeURIComponent(
                    blog.title.replace(/\s+/g, "-").toLowerCase()
                  )}`}
                  className="hover:text-blue-600"
                >
                  <h4 className="text-xs sm:text-sm font-medium mb-1">{blog.title}</h4>
                </Link>
                <p className="text-xs text-gray-700">
                  இன்று நீங்கள் இலவசமாக பதிவிறக்கம் செய்யக்கூடிய கிப்ட்கார்டு
                  வடிவமைப்பு அமைப்புகள்.
                </p>
              </div>
            ))}
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

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default HomeBlog;
