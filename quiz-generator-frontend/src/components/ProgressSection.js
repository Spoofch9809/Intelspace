import React, { useState, useEffect } from "react";
import "./ProgressSection.css";
import axios from "axios";

function ProgressSection() {
  const [active, setActive] = useState("in-progress");
  const [progressData, setProgressData] = useState({
    languages: {
      python: 0,
      javascript: 0,
      cpp: 0,
      java: 0,
      rust: 0,
    },
    totalCoursesCompleted: 0,
    totalQuizzesCompleted: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = (status) => {
    setActive(status);
  };

  useEffect(() => {
    const fetchProgress = async () => {
      const email = localStorage.getItem("email"); // Retrieve email from localStorage
      if (!email) {
        setError("Please log in to view your progress.");
        setLoading(false);
        return;
      }

      try {
        // Fetch language progress
        const languageProgressResponse = await axios.get(
          `http://127.0.0.1:8000/progress?email=${email}`
        );

        // Fetch additional metrics
        const metricsResponse = await axios.get(
          `http://127.0.0.1:8000/progress/metrics?email=${email}`
        );

        // Update progressData with both language progress and metrics
        setProgressData({
          languages: languageProgressResponse.data.languages,
          totalCoursesCompleted: metricsResponse.data.totalCoursesCompleted,
          totalQuizzesCompleted: metricsResponse.data.totalQuizzesCompleted,
          averageScore: metricsResponse.data.averageScore,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching progress data:", err);
        setError("Failed to fetch progress data");
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <section className="learning-progress">
      <h2>My Learning</h2>
      <div className="progress-button-container">
        <div
          className={`in-progress ${active === "in-progress" ? "active" : ""}`}
          onClick={() => handleClick("in-progress")}
        >
          <p>In progress</p>
        </div>
        <div
          className={`completed ${active === "completed" ? "active" : ""}`}
          onClick={() => handleClick("completed")}
        >
          <p>Completed</p>
        </div>
        <div
          className="orange-line"
          style={{ left: active === "in-progress" ? "0" : "160px" }}
        ></div>
      </div>
      <div className="black-line"></div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="container-wrapper">
          <div
            className={`progress-container ${
              active === "completed" ? "slide-out" : ""
            }`}
          >
            {/* Display progress data dynamically */}
            {Object.entries(progressData.languages).map(([language, progress]) => (
              <div className="progress-item" key={language}>
                <h3>{getCourseTitle(language)}</h3>
                <p>Track your progress in {language} quizzes and exercises.</p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p>{progress}% completed</p>
              </div>
            ))}
          </div>

          <div
            className={`completed-container ${
              active === "completed" ? "slide-in" : ""
            }`}
          >
            <div className="completed-item">
              <h3>Total courses completed</h3>
              <h4>{progressData.totalCoursesCompleted}</h4>
            </div>
            <div className="completed-item">
              <h3>Total quizzes completed</h3>
              <h4>{progressData.totalQuizzesCompleted}</h4>
            </div>
            <div className="completed-item">
              <h3>Average score</h3>
              <h4>{progressData.averageScore}%</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const getCourseTitle = (language) => {
  const titles = {
    python: "Computer Programming (Python)",
    rust: "Elementary System Programming (Rust)",
    cpp: "Object Oriented Programming (C++)",
    javascript: "Web Development (JavaScript)",
    java: "Advanced Programming (Java)",
  };
  return titles[language] || "Unknown Course";
};

export default ProgressSection;
