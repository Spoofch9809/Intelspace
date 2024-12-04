import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage"; 
import QuizGenerator from "./pages/QuizGenerator"; 
import QuizPage from "./pages/QuizPage"; 
import CodeEditor from "./pages/CodeEditor"; 
import LoginPage from "./pages/LoginPage"; 
import CoursesPage from "./pages/CoursesPage"; 
import QuizzesPage from "./pages/QuizzesPage"; 
import SignupPage from "./pages/SignupPage"; 
import ResultPage from "./pages/ResultPage"; 
import SearchPage from "./pages/SearchPage"; 
import LanguageSelection from "./pages/LanguageSelection";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Default route */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/quiz-generator" element={<QuizGenerator />} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/courses-page" element={<CoursesPage />} />
        <Route path="/quizzes-page" element={<QuizzesPage />} />
        <Route path="/signup-page" element={<SignupPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
      </Routes>
    </div>
  );
}

export default App;