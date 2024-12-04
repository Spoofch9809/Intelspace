import React from "react";
import { useNavigate } from "react-router-dom";
import "./PopularSection.css";

function PopularSection() {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate("/quiz-page");
  };

  return (
    <section className="most-popular">
      <h2>Most Popular Courses</h2>

      <div className="popular-container">
        <div className="popular-item" onClick={handleItemClick}>
          <h3>Data Structure and Algorithms</h3>
          <p>
            This multiple choice quiz focuses on Arrays, Linked Lists, Trees,
            etc.
          </p>
        </div>
        <div className="popular-item" onClick={handleItemClick}>
          <h3>Computer Programming with Python</h3>
          <p>This quiz focuses on functions, loops, classes, and more.</p>
        </div>
      </div>
    </section>
  );
}

export default PopularSection;