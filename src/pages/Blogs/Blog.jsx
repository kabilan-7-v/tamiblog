import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../api/Api";
import Categories from "./components/categories";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [latestBlog, setLatestBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await axios.get(`${BaseUrl}/api/articles`);
        let blogsData = [];

        if (blogsResponse.data && Array.isArray(blogsResponse.data.data)) {
          blogsData = blogsResponse.data.data;
          setBlogs(blogsData);
          setLatestBlog(blogsData[blogsData.length - 1]);
        } else if (blogsResponse.data?.blogs) {
          blogsData = blogsResponse.data.blogs;
          setBlogs(blogsData);
          setLatestBlog(blogsData[blogsData.length - 1]);
        }

        const categoriesResponse = await axios.get(
          `${BaseUrl}/api/public/categories`
        );

        if (
          categoriesResponse.data &&
          Array.isArray(categoriesResponse.data.data)
        ) {
          const allCategories = categoriesResponse.data.data;
          
          const usedCategoryNames = new Set();
          blogsData.forEach((blog) => {
            if (blog.category) {
              usedCategoryNames.add(blog.category);
            }
          });

          const filteredCategories = allCategories.filter((category) =>
            usedCategoryNames.has(category.name)
          );

          setAvailableCategories(filteredCategories);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!latestBlog)
    return <div className="text-center py-10 h-screen">No blogs found</div>;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="mx-auto">
          <div className="bg-[#F4F0F8] rounded-lg p-4 sm:p-6 md:p-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
              கட்டுரைகள்
            </h1>
            <p className="text-xs sm:text-sm text-center text-gray-600 mt-2">
              Last Updated on 07th January 2023
            </p>
          </div>
          <div className="mt-6 sm:mt-8 text-gray-700 leading-relaxed p-4 sm:p-6 md:p-10 max-w-5xl mx-auto">
            <p className="mb-4 text-sm sm:text-base">
              இந்தப் பக்கம் உடல்நலம், மனநிலை, படைப்பாற்றல், கற்பித்திறன் மற்றும்
              பல தலைப்புகளில் பயக்க கூடிய கட்டுரைகளைப் பதிவிட்டு கொள்கிறேன்.
              எனது பணியை இயக்கும் மையக் கேள்வி, "நான் எப்படி சிறப்பாக வாழ
              முடியும்?" என்பதாகும். அந்தக் கேள்விக்கு பதிலளிக்க, நடைமுறைச்
              சிக்கல்களைத் தீர்ப்பதற்கான அறிவியல் சார்ந்த வழிகளைப் பற்றி எழுத
              விரும்புகிறேன்.
            </p>
            <p className="text-sm sm:text-base">
              தனிநபர்போன்றவை, எவ்வாறு நிறுக்கவும் போன்ற கலைப்புகளில் பயக்க
              கூடியதாயிமானை கட்டுரைகளையும், படிக்க சிறந்த புத்தகங்களின் பட்டியல்
              மற்றும் எனது குழந்தைப்பட்ச பயண அனுபவட்டி போன்ற தனிப்பட்ட
              பரிந்துரைகளையும் நீங்கள் காணலாம். இதில் முழுமையாக ஈடுபட தயாரா?
              எனது சிறந்த கட்டுரைகளை உலவ கீழே உள்ள வகைகளைப் பயன்படுத்தலாம்.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
            அனைத்து கட்டுரைகளும்
          </h1>
          <p className="text-xs sm:text-sm text-center text-gray-600 mt-2">
            தலைப்பு வாரியாக கட்டுரைகளை உலாவுக.
          </p>
        </div>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-[#F4F0F8] rounded-lg p-4 sm:p-6">
        <div className="w-full md:w-1/2 p-4 md:p-10">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">{latestBlog.title}</h1>

          <div className="flex flex-wrap items-center text-sm sm:text-base text-gray-600 mb-6">
            <span>By {latestBlog.author?.authorName}</span>
            <span className="mx-2">|</span>
            <span>
              {latestBlog.date}
            </span>
          </div>

          <div className="text-base sm:text-lg mb-6">
            <p>{stripHtmlTags(latestBlog.content)?.substring(0, 80)}...</p>
          </div>

          <Link
            to={`/blogs/${latestBlog._id}/${latestBlog.link}`}
            className="bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-gray-700 transition inline-block text-sm sm:text-base"
          >
            மேலும் படிக்கவும்
          </Link>
        </div>

        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto">
          {latestBlog.content && latestBlog.content.includes("<img") ? (
            <div
              dangerouslySetInnerHTML={{
                __html: extractImageTag(latestBlog.content),
              }}
              className="w-full h-full rounded-lg overflow-hidden"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-12">
        {/* <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
          அனைத்து இடுகைகளும்
        </h2> */}

        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {blogs
            .filter((blog) => blog._id !== latestBlog._id)
            .map((blog) => (
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
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-2/3 p-4 sm:p-6 flex flex-col">
                  <div className="text-sm text-blue-600 mb-2">
                    {blog.category || "தலைப்பு இல்லை"}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{blog.title}</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 flex-grow">
                    {stripHtmlTags(blog.content)?.substring(0, 150)}...
                  </p>

                  <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  {
                    blog.date
                  }
                  </div>

                  <Link
                    to={`/blogs/${blog._id}/${blog.link}`}
                    state={{ post: blog }}
                    className="bg-gray-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-gray-700 transition self-start text-sm sm:text-base"
                  >
                    மேலும் படிக்கவும்
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Categories availableCategories={availableCategories} />
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

export default Blog;
