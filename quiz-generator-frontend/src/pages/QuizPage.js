import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./QuizPage.css";
import Header from "../components/Header.js";

function QuizPage() {
  const { quizName } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  const questions = [
    {
      text: "What will be the output of the following Python code?",
      code: "x = 'abcd'\nfor i in range(len(x)):\n    print(i)",
      options: ["1234", "abcd", "0123", "Error"],
    },
    {
      text: "What is moodeng?",
      code: "x = 'abcdefghijk'\nfor i in range(len(x)):\n    print(i)",
      options: ["moo", "pork", "hippo", "beef"],
    },
    {
      text: "What will be the output of the following Python code?",
      code: `class Car:
      def __init__(self, make, model, year):
          self.make = make
          self.model = model
          self.year = year
          self.speed = 0
  
      def accelerate(self, amount):
          self.speed += amount
          print(f"The car is now going {self.speed} mph.")
  
      def brake(self, amount):
          self.speed -= amount
          if self.speed < 0:
              self.speed = 0
          print(f"The car is now going {self.speed} mph.")
  
      def honk(self):
          print("Honk! Honk!")
  
      def get_info(self):
          return f"{self.year} {self.make} {self.model}"
  
      my_car = Car("Toyota", "Corolla", 2020)
      print(my_car.get_info())
      my_car.accelerate(30)
      my_car.brake(10)
      my_car.honk()`,
      options: ["p t o", "p y t h o n", "p y t o n", "Syntax Error"],
    },
    {
      text: "What's the purpose of this code?",
      code: "for i in range(3):\n    print('meow')",
      options: ["Make a cat purr", "Print 'meow' three times", "Run forever", "Cause an error"],
    },
    {
      text: "What does this code print?",
      code: "x = [5, 4, 3, 2, 1]\nx.sort()\nprint(x[0])",
      options: ["5", "4", "1", "Sorted List"],
    },
    {
      text: "What's happening here?",
      code: "x = 'Banana'\nprint(x.upper())",
      options: ["banana", "BANANA", "BaNaNa", "Error"],
    },
    {
      text: "What's the purpose of this code?",
      code: "def greet():\n    print('Hello World!')\ngreet()",
      options: ["Define a function", "Call a function", "Print 'Hello World!'", "All of the above"],
    },
    {
      text: "What would be printed to the console?",
      code: "x = 'code'\nprint(x[::-1])",
      options: ["edoc", "codec", "Python", "Error"],
    },
    {
      text: "What's the purpose of this code?",
      code: "def greet():\n    print('Hello World!')\ngreet()",
      options: ["Define a function", "Call a function", "Print 'Hello World!'", "All of the above"],
    },
    {
      text: "What will be the output?",
      code: "x = [0, 1, 2, 3]\nprint(x[-1])",
      options: ["0", "1", "3", "IndexError"],
    },
  ];

  const handlePaginationClick = (number) => {
    if (number >= 1 && number <= questions.length) {
      setCurrentQuestion(number);
    }
  };

  const handleNextClick = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion - 1]: option,
    }));
  };

  const handleSubmit = () => {
    const unansweredQuestions = questions
      .map((_, index) => (selectedOptions[index] === undefined ? index + 1 : null))
      .filter((index) => index !== null);

    if (unansweredQuestions.length > 0) {
      setShowModal(true);
      setUnansweredQuestions(unansweredQuestions);
    } else {
      const correctAnswers = questions.filter(
        (question, index) => question.correctAnswer === selectedOptions[index]
      ).length;
      const incorrectAnswers = questions.length - correctAnswers;

      navigate("/result-page", {
        state: {
          correctAnswers,
          incorrectAnswers,
          questions,
          selectedOptions,
        },
      });
    }
  };

  const handleExit = () => {
    navigate("/quizzes-page");
  };

  return (
    <div className="home-page">
      <Header />
      <div className="quizz-container">
        <div className="quiz-header">
          <h3>
            {quizName === "python" ? "Com Programming (python)" : "Functions"}
          </h3>
        </div>
        <div className="quiz-content">
          <p>{questions[currentQuestion - 1].text}</p>
          <pre>{questions[currentQuestion - 1].code}</pre>
          <div className="options-container">
            {questions[currentQuestion - 1].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedOptions[currentQuestion - 1] === option ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="quiz-navigation">
          <button className="prev-button" onClick={handlePrevClick}>
            Prev
          </button>
          {[...Array(questions.length).keys()].map((i) => (
            <button
              key={i}
              className={i + 1 === currentQuestion ? "active" : ""}
              onClick={() => handlePaginationClick(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button className="next-button" onClick={handleNextClick}>
            Next
          </button>
        </div>
        <div className="quiz-actions">
          <button onClick={handleExit} className="exit-button">
            Exit
          </button>
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      </div>
      <div className="margin"></div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Please answer the following questions before submitting:</p>
            <ul>
              {unansweredQuestions.map((questionNumber) => (
                <li key={questionNumber}>Question {questionNumber}</li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
