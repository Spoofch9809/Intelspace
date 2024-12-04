import React from "react";
import "./QuizSolution.css";

function QuizSolution({ questions, selectedAnswers }) {
  return (
    <div className="questions-section">
      {questions.map((question, index) => (
        <div key={index} className="question-item">
          <p>
            <strong>Question {index + 1}:</strong> {question.text}
          </p>
          <pre>{question.code}</pre>
          <div className="quiz-options">
            {question.options.map((option, i) => (
              <div
                key={i}
                className={`quiz-option ${
                  selectedAnswers[index] === String.fromCharCode(65 + i)
                    ? "selected"
                    : ""
                } 
                ${
                  selectedAnswers[index] === question.correctAnswer
                    ? "correct"
                    : selectedAnswers[index] === String.fromCharCode(65 + i)
                    ? "incorrect"
                    : ""
                }`}
              >
                {String.fromCharCode(65 + i)} {option}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizSolution;
