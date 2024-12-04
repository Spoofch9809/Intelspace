import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import "./SearchPage.css"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const query = useQuery();
  const [searchResults, setSearchResults] = useState([]);
  const searchTerm = query.get("query");

  const coursesData = [
    {
      title: "Computer Programming (python)",
      items: ["Variables and Data Types", "Conditional Statements", "For and While Loops", "Defining Functions", "Object-Oriented Programming", "Working with Lists and Dictionaries"]
    },
    {
      title: "Elementary System Programming (Rust)",
      items: ["While loops", "for loops", "Loop Constructs", "Defining and Using Functions", "Ownership and Borrowing", "Error Handling in Rust"]
    },
    {
      title: "Object Oriented Programming (C++)",
      items: ["Classes and Objects", "Inheritance and Polymorphism", "Encapsulation", "Constructors and Destructors", "Operator Overloading", "STL Containers"]
    }
  ];
  
  const quizzesData = [
    {
      title: "Computer Programming (python)",
      items: ["Quiz on Data Types", "Quiz on Conditional Logic", "Looping Structures Quiz", "Functions Quiz", "OOP Concepts Quiz", "Lists and Dictionaries Quiz"]
    },
    {
      title: "Elementary System Programming (Rust)",
      items: ["Variable Types Quiz", "Control Flow Quiz", "Loops and Iterators Quiz", "Functions Quiz", "Ownership Quiz", "Error Handling Quiz"]
    },
    {
      title: "Object Oriented Programming (C++)",
      items: ["Classes and Objects Quiz", "Inheritance Quiz", "Polymorphism Quiz", "Encapsulation Quiz", "Operator Overloading Quiz", "STL Quiz"]
    }
  ];

  useEffect(() => {
    if (searchTerm) {
      const filteredCourses = coursesData
        .filter(course =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          course.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .map(course => ({
          source: 'Course',
          title: course.title,
          content: course.title.toLowerCase().includes(searchTerm.toLowerCase())
            ? course.items 
            : course.items.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
              )
        }));

      const filteredQuizzes = quizzesData
        .filter(quiz =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .map(quiz => ({
          source: 'Quiz',
          title: quiz.title,
          content: quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
            ? quiz.items 
            : quiz.items.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase()) 
              )
        }));

      const results = [...filteredCourses, ...filteredQuizzes];

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="home-page">
      <Header />
      <div className="search-page-section">
      <h1>Search Results for: {searchTerm}</h1>
        {searchResults.length > 0 ? (
          searchResults.map((section, index) => (
            <div key={index}>
              <h2>{section.source}: {section.title}</h2> {/* Prefix source before the title */}
              <div className="search-page-container">
                {section.content.map((item, itemIndex) => (
                  <div className="search-page-items" key={itemIndex}>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-result">
          <p>No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}
