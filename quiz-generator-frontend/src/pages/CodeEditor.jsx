import { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Text, Button, HStack, useToast } from '@chakra-ui/react';
import { Editor } from "@monaco-editor/react";
import LanguageSelector from '../components/LanguageSelector';
import { CODE_SNIPPETS, QUESTIONS } from '../constants';
import Output from '../components/Output';
import { fetchLanguageVersions } from '../api';
import { useLocation } from 'react-router-dom';
import { debounce } from 'lodash'; 
// import Output from '../components/Output';
import Header from "../components/Header";
import "./CodeEditor.css";
import axios from "axios";



const CodeEditor = () => {
    const editorRef = useRef();
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("python");
    const [versions, setVersions] = useState({});
    const [error, setError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
    const [isCorrect, setIsCorrect] = useState(null); // Track if the answer is correct
    const toast = useToast();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const selectedLanguage = query.get('language');
    const selectedQuestionIndex = query.get('questionIndex'); // New query parameter to get the question index

    useEffect(() => {
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
        }
        if (selectedQuestionIndex) {
            const index = parseInt(selectedQuestionIndex, 10);
            if (!isNaN(index) && index >= 0 && index < QUESTIONS[selectedLanguage]?.length) {
                setCurrentQuestionIndex(index);
                setValue(CODE_SNIPPETS[selectedLanguage][index + 1]); 
            }
        }
    }, [selectedLanguage, selectedQuestionIndex]);

    useEffect(() => {
        const loadVersions = async () => {
            try {
                const runtimes = await fetchLanguageVersions();
                const versionMap = {};
                runtimes.forEach(runtime => {
                    versionMap[runtime.language] = runtime.version;
                });
                setVersions(versionMap);
            } catch (err) {
                setError("Error fetching language versions");
                console.error(err);
            }
        };
        loadVersions();
    }, []);

    
    useEffect(() => {
        const originalErrorHandler = window.onerror;

        window.onerror = (message, source, lineno, colno, error) => {
            if (message.includes("ResizeObserver loop completed with undelivered notifications")) {
                
                return true; 
            }
            
            return originalErrorHandler ? originalErrorHandler(message, source, lineno, colno, error) : false;
        };

        
        return () => {
            window.onerror = originalErrorHandler;
        };
    }, []);

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language][currentQuestionIndex + 1]); 
    };

    
    const removeComments = (code) => {
        // Remove single-line comments starting with # and //
        let codeWithoutComments = code.replace(/#.*$/gm, '').replace(/\/\/.*$/gm, '');

        // Remove all extra spaces, including line breaks
        let codeWithoutExtraSpaces = codeWithoutComments.replace(/\s+/g, ' ').trim();

        return codeWithoutExtraSpaces;
    };

    const checkAnswer = async () => {
        const cleanedUserCode = removeComments(value); // Remove comments from the user's code
        const cleanedSolution = removeComments(currentQuestion.solution); // Remove comments from the solution
    
        if (cleanedUserCode === cleanedSolution) {
            setIsCorrect(true);
            toast({
                title: "Correct!",
                description: "Your answer is correct.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
    
            // Prepare the payload matching the SaveCodeResultRequest model
            const email = localStorage.getItem("email") || "max.khemanukul@gmail.com"; // Replace with actual user email if available
            const payload = {
                email,                         // Email of the user
                language: language || "unknown", // The language being checked
                question: currentQuestion?.question || "Unknown Question", // The current question
                completed: true,               // Mark as completed
            };
    
            console.log("Payload being sent to backend:", payload);
    
            try {
                // Use axios to send the payload to the backend
                const response = await axios.post(
                    "http://127.0.0.1:8000/save_code_result/",
                    payload
                );
    
                console.log("Response from backend:", response.data);
    
                if (response.status === 200) {
                    console.log("Result saved successfully");
                }
            } catch (error) {
                console.error("Error saving result:", error);
                alert("An error occurred while saving your result.");
            }
        } else {
            setIsCorrect(false);
            toast({
                title: "Incorrect.",
                description: "Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };
    
    
    const debouncedSetValue = useCallback(debounce((newValue) => {
        setValue(newValue);
    }, 300), []); 

    const currentQuestion = QUESTIONS[language]?.[currentQuestionIndex]; // Updated to handle potential undefined

    const nextQuestion = () => {
        if (currentQuestionIndex < QUESTIONS[language]?.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setValue(CODE_SNIPPETS[language][currentQuestionIndex + 2]); 
            setIsCorrect(null);
        } else {
            toast({
                title: "Quiz Complete!",
                description: "You have completed all questions.",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setValue(CODE_SNIPPETS[language][currentQuestionIndex]); 
            setIsCorrect(null);
        }
    };
    

    return (
        <div className="home-page">
            <Header />
            <Text className="question-text" fontSize={["md", "lg", "xl", "2xl"]} mb={4}><b>{currentQuestion?.question}</b></Text>
            <HStack className="main-container" spacing={8}>
                <Box className="editor-box" w="50%">
                    <LanguageSelector className="language-dropbox" language={language} onSelect={onSelect} />
                    <Editor
                        height="50vh"
                        theme="vs-dark"
                        language={language}
                        value={value}
                        onMount={onMount}
                        onChange={(newValue) => debouncedSetValue(newValue)}
                    />
                </Box>
                <Box className="output-box" w="50%" pr={60}>
                    <Output editorRef={editorRef} language={language} />
                </Box>
            </HStack>
            <HStack className="three-buttons" mt={4} spacing={4} p={10}>
                <Button
                    onClick={prevQuestion}
                    colorScheme="black"
                    bg="blue.100" // Set the background color
                    isDisabled={currentQuestionIndex === 0} // Disable if on the first question
                    _hover={{ bg: "blue.200" }} // Optional: Add hover effect
                >
                    Prev
                </Button>
                <Button 
                    onClick={checkAnswer} 
                    colorScheme="teal"
                >
                    Submit
                </Button>
                <Button 
                    onClick={nextQuestion} 
                    colorScheme="blue" 
                    bg="blue.100" // Set the background color
                    isDisabled={isCorrect === null || currentQuestionIndex === QUESTIONS[language].length - 1}
                    _hover={{ bg: "blue.200" }} // Optional: Add hover effect
                >
                    Next
                </Button>
            </HStack>
        </div>
    );
};

export default CodeEditor;