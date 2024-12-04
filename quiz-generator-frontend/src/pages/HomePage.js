import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProgressSection from "../components/ProgressSection";
import PopularSection from "../components/PopularSection";
import CoursesSection from "../components/CoursesSection";
import QuizzesSection from "../components/QuizzesSection";
import QuizGenerator from "./QuizGenerator";
import "./HomePage.css";

function HomePage() {
  const videoRef = useRef(null);

  return (
    <div className="home-page">
      <Header />

      <div className="create-quiz">
        {/* Video Background */}
        <video ref={videoRef} autoPlay loop muted playsInline>
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Button */}
        <Link to="/quiz-generator" className="create-quiz-btn">
          Create your own quiz
        </Link>
      </div>

      <ProgressSection />
      <CoursesSection />
      <QuizzesSection />
    </div>
  );
}

export default HomePage;
