import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../api/Api";

const Article = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
    console.log("Fetching articles and categories...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const categoriesResponse = await axios.get(
          `${BaseUrl}/api/public/categories`
        );

        const articlesResponse = await axios.get(`${BaseUrl}/api/blogs`);

        const articlesByCategory = {};
        articlesResponse.data.data.forEach((article) => {
          if (!articlesByCategory[article.category]) {
            articlesByCategory[article.category] = [];
          }
          articlesByCategory[article.category].push(article);
        });

        const categoriesWithArticles = categoriesResponse.data.data
          .map((category) => ({
            name: category.name,
            articles: articlesByCategory[category.name] || [],
          }))
          .filter((category) => category.articles.length > 0);

        setCategories(categoriesWithArticles);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
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

      <div className="mt-6 sm:mt-10">
        <div className="mx-auto mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
            அனைத்து கட்டுரைகளும்
          </h1>
          <p className="text-xs sm:text-sm text-center text-gray-600 mt-2">
            தலைப்பு வாரியாக கட்டுரைகளை உலாவுக.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8 sm:py-10">
            <p>Loading articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-10 text-red-500">
            <p>{error}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8 sm:py-10 text-gray-500">
            <p>No articles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 p-2 sm:p-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-gray-100 p-4 sm:p-6 md:p-10 md:px-14 rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
                  {category.name}
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                  {category.articles
                    .slice(
                      0,
                      expandedCategories[category.name]
                        ? category.articles.length
                        : 5
                    )
                    .map((article, idx) => (
                      <li
                        key={idx}
                        className="text-sm sm:text-base text-gray-700 hover:text-purple-600 cursor-pointer"
                      >
                        <Link
                          to={`/articles/${article._id}/${article.link}}`}
                          state={{ article: article ,_id:article._id }}
                        >
                          {article.title}
                        </Link>
                        <hr className="mt-2 border-gray-200" />
                      </li>
                    ))}
                </ul>
                {category.articles.length > 5 && (
                  <button
                    onClick={() => toggleExpand(category.name)}
                    className="text-purple-600 mt-3 sm:mt-4 hover:text-purple-800 text-sm sm:text-base"
                  >
                    {expandedCategories[category.name]
                      ? "Show Less"
                      : "Read More Articles >"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
