import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CoursesSection.css";
import { QUESTIONS } from "../constants";
import axios from "axios";

function CoursesSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [activeLanguage, setActiveLanguage] = useState("");

  useEffect(() => {
    const fetchCompletedQuestions = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get("http://127.0.0.1:8000/code_results", {
          params: { email },
        });

        if (response.status === 200) {
          const completionStatus = {};
          response.data.forEach((result) => {
            completionStatus[result.language] = completionStatus[result.language] || {};
            completionStatus[result.language][result.question] = result.completed;
          });
          setCompletedQuestions(completionStatus);
        }
      } catch (error) {
        console.error("Error fetching completed questions:", error);
      }
    };

    fetchCompletedQuestions();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const language = params.get("language");
    if (language) {
      setActiveLanguage(language);
    }
  }, [location.search]);

  const handleItemClick = (language, questionId) => {
    navigate(`/code-editor?language=${language}&questionIndex=${questionId - 1}`);
  };

  return (
    <section className="course-popular">
      <h1>Courses</h1>
      {Object.keys(QUESTIONS).map((language) => (
        (activeLanguage === "" || activeLanguage === language) && (
          <div key={language}>
            <h2>{getCourseTitle(language)}</h2>
            <div className="course-container">
              {QUESTIONS[language].map((question) => (
                <div
                  key={question.id}
                  className="course-items"
                  onClick={() => handleItemClick(language, question.id)}
                >
                  <p>
                    {question.question}{" "}
                    {completedQuestions[language]?.[question.question] && (
                      <span style={{ color: "green" }}> - Completed</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <br />
          </div>
        )
      ))}
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

export default CoursesSection;
