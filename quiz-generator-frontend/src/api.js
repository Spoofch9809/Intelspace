import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});


export const fetchLanguageVersions = async () => {
  try {
    const response = await API.get("/runtimes");
    return response.data; 
  } catch (error) {
    console.error("Error fetching language versions:", error);
    return [];
  }
};

// Execute code using FastAPI
export const executeCode = async (language, sourceCode) => {
  try {
    const response = await API.post("/execute", {
      language: language,
      source_code: sourceCode,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error executing code:",
      error.response?.data || error.message
    );
    throw error;
  }
};
