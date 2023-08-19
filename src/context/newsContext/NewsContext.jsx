// src/contexts/NewsContext.js
import React, { createContext, useContext, useState } from "react";

const NewsContext = createContext();

export function useNewsContext() {
  return useContext(NewsContext);
}

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);

  return (
    <NewsContext.Provider value={{ news, setNews }}>
      {children}
    </NewsContext.Provider>
  );
}
