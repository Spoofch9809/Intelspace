import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./HomePage.css";
import QuizzesSection from "../components/QuizzesSection";

function HomePage() {
  return (
    <div className="home-page">
      <Header />

        <QuizzesSection />
    </div>
  );
}

export default HomePage;