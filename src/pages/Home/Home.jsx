import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import About from "./components/About";
import HomeBlog from "../Blogs/components/HomeBlog";
import Categories from "../Blogs/components/categories";
import { BaseUrl } from "../../api/Api";

const Home = () => {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const blogsResponse = await axios.get(`${BaseUrl}/api/articles`);
        let blogsData = [];

        if (blogsResponse.data && Array.isArray(blogsResponse.data.data)) {
          blogsData = blogsResponse.data.data;
        } else if (blogsResponse.data?.blogs) {
          blogsData = blogsResponse.data.blogs;
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
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Banner />
      <HomeBlog />
      <About />
      {!loading && <Categories availableCategories={availableCategories} />}
    </div>
  );
};

export default Home;
