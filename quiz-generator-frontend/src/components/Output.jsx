import { Box, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useState } from "react";
import React from 'react';
import "./Output.css";

const Output = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const result = await executeCode(language, sourceCode);
            setOutput(result.stdout.split("\n"));
            setIsError(result.stderr !== "");
        } catch (error) {
            console.log(error);
            toast({
                title: "An error occurred.",
                description: error.message || "Unable to execute the code.",
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="output">
            <Text className="output-title">Output:</Text>
            {/* Replacing Chakra UI Button with a native button element */}
            <button
                className="run-button"
                onClick={runCode}
                disabled={isLoading}  
            >
                {isLoading ? 'Running...' : 'Run Code'}
            </button>
            <Box 
                className={`output-box ${isError ? "error" : ""}`}
            >
                {output ? output.map((line, i) => <Text key={i} className="output-text">{line}</Text>) : "Click 'Run Code' to execute the code"}
            </Box>
        </div>
    );
}

export default Output;