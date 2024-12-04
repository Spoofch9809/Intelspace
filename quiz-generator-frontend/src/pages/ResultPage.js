import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import PieChart from '../components/Piechart';  // Import PieChart
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const { questions = [], selectedAnswers = [] } = location.state || {}; // Destructure with fallback to empty arrays
  const [showModal, setShowModal] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  // Identify unanswered questions
  const handleUnansweredQuestions = () => {
    const unanswered = questions
      .map((q, index) => (selectedAnswers[index] === undefined ? index + 1 : null))
      .filter((q) => q !== null);

    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered);
      setShowModal(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setUnansweredQuestions([]);
  };

  // Calculate correct answers
  const correctAnswers = questions.filter(
    (q, index) => selectedAnswers[index] === q.correctAnswer
  );

  // Calculate score
  const score = correctAnswers.length;

  // Calculate the count of correct and incorrect answers
  const correctAnswersCount = correctAnswers.length;
  const incorrectAnswersCount = questions.length - correctAnswersCount;

  return (
    <div className="result-page">
      <h1>You've completed the quiz!</h1>
      <p>Your Score: {score} / {questions.length}</p>
      <PieChart
        correctAnswersCount={correctAnswersCount}
        incorrectAnswersCount={incorrectAnswersCount}
      />
      <div className="answers-list">
        <h3>Answers:</h3>
        <ul>
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <li key={index} className={isCorrect ? 'correct' : 'incorrect'}>
                <p><strong>{question.text}</strong></p>
                <p>Your Answer: {userAnswer !== undefined 
                  ? question.options[userAnswer.charCodeAt(0) - 65] 
                  : "No answer provided"}</p>
                <p>
                  Correct Answer: {question.options[question.correctAnswer.charCodeAt(0) - 65]}
                </p>
                {/* Only display explanation if it exists */}
                {question.explanation && (
                  <p className="explanation">Explanation: {question.explanation}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">Unanswered Questions</div>
            <p>Please answer the following questions:</p>
            <ul>
              {unansweredQuestions.map((qNum) => (
                <li key={qNum}>Question {qNum}</li>
              ))}
            </ul>
            <button onClick={closeModal} className="close-modal-button">Close</button>
          </div>
        </div>
      )}

      <Link to="/home" className="return-button">
        Return to Home
      </Link>
      <div className="margin"></div> 
    </div>
  );
};

export default ResultPage;
