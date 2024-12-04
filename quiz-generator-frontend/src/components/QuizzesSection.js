import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./QuizzesSection.css";

function QuizzesSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [finishedQuizzes, setFinishedQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const quizRefs = useRef({}); // Ref to store quiz elements for scrolling

  useEffect(() => {
    const fetchFinishedQuizzes = async () => {
      const email = localStorage.getItem("email");

      if (!email) {
        setError("Please log in to view your quizzes.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/user_quizzes/", {
          params: { email },
        });
        setFinishedQuizzes(response.data.quizzes);
        setLoading(false);

        // Scroll to the quiz if query parameter is present
        const params = new URLSearchParams(location.search);
        const quizTitle = params.get("quizTitle");
        if (quizTitle && quizRefs.current[quizTitle]) {
          quizRefs.current[quizTitle].scrollIntoView({ behavior: "smooth" });
        }
      } catch (err) {
        setError("Failed to load finished quizzes.");
        setLoading(false);
      }
    };

    fetchFinishedQuizzes();
  }, [location.search]); // Re-run when the URL changes

  const handleRedoQuiz = async (quizTitle) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/quizzes/${quizTitle}/redo`);
      const quiz = response.data.quiz;

      navigate("/quiz-generator", {
        state: {
          questions: quiz.questions,
          quizTitle: quiz.quiz_title,
          isFileUploaded: true,
        },
      });
    } catch (err) {
      setError("Failed to load quiz for redo.");
    }
  };

  const handleQuizClick = async (quizTitle) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/quizzes/${quizTitle}`);
      setSelectedQuiz(response.data.quiz);
    } catch (err) {
      setError("Failed to load quiz details.");
    }
  };

  const handleBackToList = () => {
    setSelectedQuiz(null);
  };

  if (loading) {
    return <div>Loading finished quizzes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (selectedQuiz) {
    return (
      <section className="quiz-details">
        <h1 className="quiz-details-title">{selectedQuiz.quiz_title}</h1>
        <ul className="quiz-details-list">
          {selectedQuiz.questions.map((question, index) => {
            const userAnswer = selectedQuiz.answers[index] || "Not Answered";
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <li
                key={index}
                className={`question-detail ${isCorrect ? "correct" : "incorrect"}`}
              >
                <p>
                  <strong>Q{index + 1}:</strong> {question.text}
                </p>
                <p>
                  <strong>Options:</strong> {question.options.join(", ")}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
                <p>
                  <strong>Your Answer:</strong> {userAnswer}{" "}
                  {userAnswer === "Not Answered"
                    ? ""
                    : isCorrect
                    ? "(Correct)"
                    : "(Incorrect)"}
                </p>
              </li>
            );
          })}
        </ul>
        <button className="return-button" onClick={handleBackToList}>
          Back to Quiz List
        </button>
      </section>
    );
  }

  return (
    <section className="quiz-list">
      <h1 className="finished-quizzes-title">Finished Quizzes</h1>
      {finishedQuizzes.length === 0 ? (
        <p>No finished quizzes available.</p>
      ) : (
        finishedQuizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="quiz-card"
            ref={(el) => (quizRefs.current[quiz.quiz_title] = el)} // Store ref for scrolling
          >
            <h2>{quiz.quiz_title}</h2>
            <button
              className="result-button"
              onClick={() => handleQuizClick(quiz.quiz_title)}
            >
              View Results
            </button>
            <button
              className="redo-button"
              onClick={() => handleRedoQuiz(quiz.quiz_title)}
            >
              Redo Quiz
            </button>
          </div>
        ))
      )}
    </section>
  );
}

export default QuizzesSection;
