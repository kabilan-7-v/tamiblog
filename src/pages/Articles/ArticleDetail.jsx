import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { BaseUrl } from "../../api/Api";

const ArticleDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!location.state?.article);
  const [error, setError] = useState(null);
  const [similarArticles, setSimilarArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (article && article._id === id) return;

      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/api/articles/${id}`);
        if (response.data) {
          setArticle(response.data.data || response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to fetch article details");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, article]);

  useEffect(() => {
    const fetchSimilarArticles = async () => {
      if (!article) return;

      try {
        const response = await axios.get(`${BaseUrl}/api/articles`);
        const allArticles = response.data.data || [];

        const otherArticles = allArticles.filter((a) => a._id !== id);

        let sameCategoryArticles = [];
        if (article.category) {
          sameCategoryArticles = otherArticles.filter(
            (a) => a.category === article.category
          );
        }

        if (sameCategoryArticles.length >= 3) {
          setSimilarArticles(sameCategoryArticles.slice(0, 3));
        } else {
          const otherCategoryArticles = otherArticles.filter(
            (a) => a.category !== article.category
          );
          const combined = [...sameCategoryArticles, ...otherCategoryArticles];
          setSimilarArticles(combined.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching similar articles:", err);
      }
    };

    fetchSimilarArticles();
  }, [article, id]);

  useEffect(() => {
    if (article) {
      document.title = article.title;
    }
    return () => {
      document.title = "Articles";
    };
  }, [article]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!article)
    return <div className="text-center py-10">Article not found</div>;

  return (
    <div className="mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <Link
        to="/articles"
        className="inline-flex items-center text-gray-600 mb-4 sm:mb-6 hover:text-gray-900 text-sm sm:text-base"
      >
        <FaArrowLeft className="mr-2" /> திரும்பிச் செல்க
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10 sm:mb-20 p-4 sm:p-6 md:p-10">
        <div className="p-3 sm:p-6 border-b">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm sm:text-base text-gray-600 gap-2 sm:gap-0">
            <span>By {article.author?.name || article.author?.authorName}</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>
             {article.date}
             
            </span>
            {article.category && (
              <>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="text-blue-600">{article.category}</span>
              </>
            )}
          </div>
        </div>

        <div className="p-3 sm:p-6 max-w-5xl">
          <div
            className="prose prose-sm sm:prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>

      {similarArticles.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-14">
            அடுத்து என்ன படிக்க வேண்டும்
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {similarArticles.map((similarArticle) => (
              <div
                key={similarArticle._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="p-3 sm:p-4">
                  <div className="text-xs sm:text-sm text-blue-600 mb-1 sm:mb-2">
                    {similarArticle.category || "தலைப்பு இல்லை"}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                    {similarArticle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                    {stripHtmlTags(similarArticle.content)?.substring(0, 80)}...
                  </p>

                  <Link
                    to={`/articles/${similarArticle._id}/${encodeURIComponent(
                      similarArticle.title.replace(/\s+/g, "-").toLowerCase()
                    )}`}
                    state={{ article: similarArticle }}
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

function stripHtmlTags(htmlContent) {
  if (!htmlContent) return "";
  return htmlContent.replace(/<[^>]*>/g, "");
}

export default ArticleDetail;
