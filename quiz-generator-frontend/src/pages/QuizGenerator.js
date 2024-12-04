import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom"; // Corrected import for React Router v6
import "./QuizGenerator.css";

function QuizGenerator() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const location = useLocation();
  const [isFileUploaded, setUploaded] = useState(location.state?.isFileUploaded || false);  
  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [quizTitle, setQuizTitle] = useState(location.state?.quizTitle || "");


  
  const navigate = useNavigate(); // Initialize the navigate function from React Router v6

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(e.target.value);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    setScore(0);
    setCurrentQuestionIndex(0);
    setLoading(true);
    setError("");
    setIsQuizSubmitted(false);
    setSelectedAnswers({});

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/uploadfile/?num_questions=${numQuestions}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data && Array.isArray(response.data.questions)) {
        const updatedQuestions = response.data.questions.map((q) => ({
          ...q,
          correctAnswer: q.correct_answer,
        }));
        setQuestions(updatedQuestions);
        setUploaded(true);
      } else {
        setError("No questions were generated. Please check the PDF content.");
        setQuestions([]);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "An unexpected error occurred.");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = (selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const email = localStorage.getItem("email"); // Retrieve email from local storage
  
    // Identify unanswered questions
    const unanswered = questions
      .map((_, index) => (selectedAnswers[index] == null ? index + 1 : null))
      .filter((q) => q !== null);
  
    if (unanswered.length > 0) {
      // If there are unanswered questions, show the modal
      setUnansweredQuestions(unanswered);
      setShowModal(true);
      return; // Stop submission if there are unanswered questions
    }
  
    const correctAnswers = questions.filter(
      (q, index) => selectedAnswers[index] === q.correctAnswer
    );
    const calculatedScore = correctAnswers.length;
  
    const payload = {
      quizTitle: quizTitle || "Untitled Quiz",
      questions: questions.map((q) => ({
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
      answers: selectedAnswers,
      score: calculatedScore,
      email,
    };
  
    console.log("Payload sent to backend:", payload);
  
    // Proceed with submitting the quiz only if all questions are answered
    axios
      .post("http://127.0.0.1:8000/save_quiz_results", payload)
      .then((response) => {
        console.log("Response from backend:", response.data);
  
        if (response.status === 200) {
          setScore(calculatedScore);
          setIsQuizSubmitted(true);
          navigate("/result", {
            state: { questions, selectedAnswers, score: calculatedScore },
          });
        }
      })
      .catch((error) => {
        console.error("Error saving quiz results:", error);
        alert("An error occurred while saving your results.");
      });
  };


  useEffect(() => {
    const fetchQuizData = async () => {
      const email = localStorage.getItem("email"); // Retrieve user's email from local storage
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user_quizzes/?email=${email}`);
        if (response.status === 200) {
          console.log("Quizzes fetched:", response.data.quizzes);
          // Perform any additional setup like setting state for quizzes
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        alert("Failed to fetch quiz data.");
      }
    };
  
    fetchQuizData();
  }, []); // The empty dependency array ensures this runs only once on component mount
  
  
  
  
  

  const closeModal = () => {
    setShowModal(false);
    setUnansweredQuestions([]);
  };

  const renderAnswerButtons = (question) => {
    if (!question.options || question.options.length === 0) {
      return null;
    }

    return question.options.map((option, index) => (
      <button
        key={index}
        onClick={() => handleAnswerClick(String.fromCharCode(65 + index))}
        className={`answerButton ${
          selectedAnswers[currentQuestionIndex] ===
          String.fromCharCode(65 + index)
            ? "selected"
            : ""
        }`}
      >
        {option}
      </button>
    ));
  };

  const renderPagination = () => {
    return questions.map((_, index) => (
      <button
        key={index}
        className={`pagination-button ${
          index === currentQuestionIndex ? "active" : ""
        } ${selectedAnswers[index] == null ? "unanswered" : ""}`}
        onClick={() => setCurrentQuestionIndex(index)}
      >
        {index + 1}
      </button>
    ));
  };

  return (
    <div className="home-page">
      <Header />
      <div className="quiz-generator-container">
        <div className="upload-box">
          {!isFileUploaded && (
            <form onSubmit={handleSubmitFile}>
              <label htmlFor="file-upload" className="file-upload-box">
                {file ? file.name : "Upload or drag and drop a file"}
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
              <div className="question-input">
                <label>
                  Quiz Title:
                  <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                  />
                </label>
                <label>
                  Number of Questions:
                  <input
                    type="number"
                    value={numQuestions}
                    onChange={handleNumQuestionsChange}
                    min="1"
                  />
                </label>
              </div>
              <button type="submit" className="convert-btn" disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
              </button>
            </form>
          )}
          {error && <p className="error-message">{error}</p>}
          <div className="quiz-section">
            {questions.length > 0 && !isQuizSubmitted && (
              <div>
                <p className="question-text">
                  {questions[currentQuestionIndex].text}
                </p>
                <div className="answer-options">
                  {renderAnswerButtons(questions[currentQuestionIndex])}
                </div>
                <div className="navigation-container">
                  <button
                    className="prev-button"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Prev
                  </button>
                  <div className="pagination">{renderPagination()}</div>
                  <button
                    className="next-button"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </button>
                </div>

                <button
                  className="submit-button"
                  onClick={handleSubmitQuiz}
                >
                  Submit
                </button>
              </div>
            )}
            {isQuizSubmitted && (
              <div className="score-section">
                <p className="score-text">
                  Quiz Completed! Your Score: {score} / {questions.length}
                </p>
              </div>
            )}
          </div>
        </div>
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">Unanswered Questions</div>
              <p>Please answer the following questions before submitting:</p>
              <ul>
                {unansweredQuestions.map((qNum) => (
                  <li key={qNum}>Question {qNum}</li>
                ))}
              </ul>
              <div className="modal-footer">
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizGenerator;