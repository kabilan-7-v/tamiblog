import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../api/Api";
import { FaArrowLeft } from "react-icons/fa";

const BlogDetail = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!location.state?.post);
  const [error, setError] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (blog && blog._id === id) return; // Skip if we already have the correct blog

      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/api/blogs/${id}`);
        if (response.data) {
          setBlog(response.data.data || response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog details");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, blog]);

  useEffect(() => {
    const fetchSimilarBlogs = async () => {
      if (!blog) return;

      try {
        const response = await axios.get(`${BaseUrl}/api/blogs`);
        let allBlogs = [];

        if (response.data && Array.isArray(response.data.data)) {
          allBlogs = response.data.data;
        } else if (response.data?.blogs) {
          allBlogs = response.data.blogs;
        }

        const otherBlogs = allBlogs.filter((b) => b._id !== id);

        let sameCategoryBlogs = [];
        if (blog.category) {
          sameCategoryBlogs = otherBlogs.filter(
            (b) => b.category === blog.category
          );
        }

        if (sameCategoryBlogs.length >= 3) {
          setSimilarBlogs(sameCategoryBlogs.slice(0, 3));
        } else {
          const otherCategoryBlogs = otherBlogs.filter(
            (b) => b.category !== blog.category
          );
          const combined = [...sameCategoryBlogs, ...otherCategoryBlogs];
          setSimilarBlogs(combined.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching similar blogs:", err);
      }
    };

    fetchSimilarBlogs();
  }, [blog, id]);

  // Optional: Update document title when blog loads
  useEffect(() => {
    if (blog) {
      document.title = blog.title;
    }
    return () => {
      document.title = "Blog"; // Reset on unmount
    };
  }, [blog]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!blog) return <div className="text-center py-10">Blog not found</div>;

  return (
    <div className="mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <Link
        to="/blog"
        className="inline-flex items-center text-gray-600 mb-4 sm:mb-6 hover:text-gray-900"
      >
        <FaArrowLeft className="mr-2" /> திரும்பிச் செல்க
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12 sm:mb-20">
        <div className="p-4 sm:p-6 border-b">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center text-sm sm:text-base text-gray-600 gap-2">
            <span>By {blog.author?.authorName}</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {blog.category && (
              <>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="text-blue-600">{blog.category}</span>
              </>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div
            className="prose max-w-none prose-sm sm:prose"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>

      {similarBlogs.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-14">
            அடுத்து என்ன படிக்க வேண்டும்
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarBlogs.map((similarBlog) => (
              <div
                key={similarBlog._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="h-40 sm:h-48 bg-gray-100">
                  {similarBlog.content &&
                  similarBlog.content.includes("<img") ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: extractImageTag(similarBlog.content),
                      }}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                </div>

                <div className="p-3 sm:p-4">
                  <div className="text-xs sm:text-sm text-blue-600 mb-1 sm:mb-2">
                    {similarBlog.category || "தலைப்பு இல்லை"}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                    {similarBlog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                    {stripHtmlTags(similarBlog.content)?.substring(0, 80)}...
                  </p>

                  <Link
                    to={`/blogs/${similarBlog._id}/${encodeURIComponent(similarBlog.title.replace(/\s+/g, '-').toLowerCase())}`}
                    state={{ post: similarBlog }}
                    className="bg-gray-800 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md hover:bg-gray-700 transition inline-block"
                  >
                    மேலும் படிக்கவும்
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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

export default BlogDetail;
