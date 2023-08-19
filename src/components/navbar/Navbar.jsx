import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/auth/AuthContext";
export default function Navbar() {
  const { currentUser, logout } = useAuth();
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
          {!currentUser ? (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <li>
              {" "}
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
