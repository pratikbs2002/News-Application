import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NewsProvider } from "./context/newsContext/NewsContext.jsx";
import { AuthProvider } from "./context/auth/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NewsProvider>
        <App />
      </NewsProvider>
    </AuthProvider>
  </React.StrictMode>
);
