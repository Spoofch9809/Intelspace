import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./HomePage.css";
import CoursesSection from "../components/CoursesSection";

function HomePage() {
  return (
    <div className="home-page">
      <Header />

        <CoursesSection />
    </div>
  );
}

export default HomePage;
