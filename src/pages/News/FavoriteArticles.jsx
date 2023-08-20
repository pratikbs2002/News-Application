import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/AuthContext"; // Update the import path
import { getFirestore, collection, getDocs } from "firebase/firestore";

const FavoriteArticles = () => {
  const { currentUser } = useAuth();
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const db = getFirestore();
      const userFavoritesCollection = collection(
        db,
        "users",
        currentUser.uid,
        "favorites"
      );

      const fetchFavoriteArticles = async () => {
        const querySnapshot = await getDocs(userFavoritesCollection);

        const favoriteArticleData = [];
        querySnapshot.forEach((doc) => {
          favoriteArticleData.push(doc.data().article);
        });

        setFavoriteArticles(favoriteArticleData);
      };

      fetchFavoriteArticles();
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Favorite Articles</h2>
      {favoriteArticles?.map((article) => (
        <div key={article.title} className="news-item">
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

export default FavoriteArticles;
