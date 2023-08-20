import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/auth/AuthContext";
import { BsBookmarkStar } from "react-icons/bs";
export default function Navbar() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  console.log(currentUser);
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          News App
        </Link>
        <ul className="nav-links">
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/fav">
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BsBookmarkStar color="white" />
                  </span>
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
