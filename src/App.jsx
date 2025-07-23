import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blogs/Blog";
import BlogDetail from "./pages/Blogs/BlogDetail";
import CategoryBlogs from "./pages/Blogs/CategoryBlogs";
import Article from "./pages/Articles/Article";
import AboutUs from "./pages/AboutUs/AboutUs";
import Contact from "./pages/ContactUs/Contact";
import Privacy from "./pages/PrivacyPolicy/Privacy";
import Footer from "./components/Footer";
import ArticleDetail from "./pages/Articles/ArticleDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[white] font-noto-sans-tamil">
        <Header />
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogs/:id/:link/*" element={<BlogDetail />} />
            <Route path="/category/:id" element={<CategoryBlogs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles" element={<Article />} />
            <Route path="/articles/:id/:link/*" element={<ArticleDetail />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
