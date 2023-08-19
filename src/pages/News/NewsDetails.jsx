import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNewsContext } from "../../context/newsContext/NewsContext";
import { useAuth } from "../../context/auth/AuthContext";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import "./NewsDetails.css";
const NewsDetails = () => {
  const { articleTitle } = useParams();
  const { news } = useNewsContext();
  const { currentUser } = useAuth();
  const article = news?.find((article) => article?.title === articleTitle);

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      // Handle user not logged in
      return;
    }

    const db = getFirestore();
    const userDocRef = doc(db, "users", currentUser.uid);
    const favoriteDocRef = doc(userDocRef, "favorites", article.title);

    try {
      if (isFavorite) {
        // Remove from favorites
        await deleteDoc(favoriteDocRef);
      } else {
        // Add to favorites
        await setDoc(favoriteDocRef, { article });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <div className="news-detail">
      <img src={article.urlToImage} alt={article.title} />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read Full Article
      </a>
      <div>
        {" "}
        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={handleFavoriteToggle}
        >
          ❤️ {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default NewsDetails;
