import { useState } from "react";
import "./NewsList.css";
import { useNavigate } from "react-router-dom";
import { useNewsContext } from "../../context/newsContext/NewsContext";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
const NewsList = () => {
  const { news } = useNewsContext();

  const [isGridView, setIsGridView] = useState(false);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };
  const navigate = useNavigate();
  const handleArticleClick = (article) => {
    navigate(`/news/${encodeURIComponent(article.title)}`);
  };

  return (
    <div className={`news-container ${isGridView ? "grid-view" : "list-view"}`}>
      <button className="toggle-button" onClick={toggleView}>
        {isGridView ? <FaListUl /> : <BsGrid3X3GapFill />}
      </button>
      {news.map((article) => (
        <div
          className={`news-item ${isGridView ? "grid-item" : ""}`}
          key={article.title}
          onClick={() => handleArticleClick(article)}
        >
          <img src={article.urlToImage} alt={article.title} />
          <div className="news-details">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
