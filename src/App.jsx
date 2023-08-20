import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css"; // Import your CSS file for styling
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import NewsDetails from "./pages/News/NewsDetails";
import { useNewsContext } from "./context/newsContext/NewsContext";
import FavoriteArticles from "./pages/News/FavoriteArticles";
import { useAuth } from "./context/auth/AuthContext";

function App() {
  const { setNews } = useNewsContext();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=aee78d6a594c48f8b6c7680d462baaf7"
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div className="navbar-container" style={{ height: "70px" }}>
          <Navbar />
        </div>
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Register /> : <Navigate replace to={"/"} />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Login /> : <Navigate replace to={"/"} />
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/fav" element={<FavoriteArticles />} />
            <Route path="/news/:articleTitle" element={<NewsDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
