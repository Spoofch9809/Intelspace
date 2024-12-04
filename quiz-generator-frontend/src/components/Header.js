import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import axios from "axios";

export default function Header() {
  const [username, setUsername] = useState(""); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [allData, setAllData] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchData = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        console.error("No email found in localStorage");
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/search-data?email=${email}`);
        setAllData(response.data.searchResults);
      } catch (err) {
        console.error("Error fetching search data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/");
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = allData.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) || 
          item.title?.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (item) => {
    if (item.type === "quiz") {
      // Pass quiz title as a query parameter
      navigate(`/quizzes-page?quizTitle=${encodeURIComponent(item.title)}`);
    } else if (item.type === "language") {
      navigate(`/courses-page?language=${item.name.toLowerCase()}`);
    }
    setSearchQuery("");
    setSearchResults([]);
  };
  

  return (
    <div className="top-box">
      <div className="logo">
        <Link to="/home">
          <img src={require("./IntelSpaceLogo.jpg")} alt="Intelspace Logo" className="logo-img" />
        </Link>
      </div>
      <div className="search-container">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          type="text"
          placeholder="Search for courses and quizzes"
          className="search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchResults.length > 0 && (
          <div className="search-dropdown">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="search-result-item"
                onClick={() => handleResultClick(item)}
              >
                {item.name || item.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="headername">
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/courses-page">Courses</Link>
          <Link to="/quizzes-page">Quizzes</Link>
        </nav>
      </div>
      <div
        className="loginname"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {username ? (
          <>
            <button className="username-button">{username}</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button className="signout-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login-page">Sign In</Link>
        )}
      </div>
    </div>
  );
}
