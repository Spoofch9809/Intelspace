from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class CodeRequest(BaseModel):
    language: str
    source_code: str

@app.get("/runtimes")
async def get_runtimes():
    runtimes = []
    languages = {
        "python": "python3 --version",
        "javascript": "node --version",
        "cpp": "g++ --version",
        "rust": "rustc --version",
        "java": "java -version",
    }

    for language, command in languages.items():
        try:
            version_output = subprocess.run(command.split(), capture_output=True, text=True)
            if version_output.returncode == 0:
                version = version_output.stdout.strip()
                runtimes.append({"language": language, "version": version})
        except Exception as e:
            continue  

    return runtimes

@app.post("/execute")
async def execute_code(request: CodeRequest):
    language = request.language
    source_code = request.source_code

    # Create a temporary file to hold the source code
    temp_code_filename = "temp_code"
    
    with open(temp_code_filename, "w") as f:
        f.write(source_code)

    try:
        if language == "python":
            result = subprocess.run(["python3", temp_code_filename], capture_output=True, text=True)
        elif language == "javascript":
            result = subprocess.run(["node", temp_code_filename], capture_output=True, text=True)
        elif language == "cpp":
            # Compile and run C++
            compile_result = subprocess.run(["g++", temp_code_filename, "-o", "temp_code_out"], capture_output=True, text=True)
            if compile_result.returncode != 0:
                return {"stderr": compile_result.stderr}
            result = subprocess.run(["./temp_code_out"], capture_output=True, text=True)
        elif language == "rust":
            # Compile and run Rust
            compile_result = subprocess.run(["rustc", temp_code_filename, "-o", "temp_code_out"], capture_output=True, text=True)
            if compile_result.returncode != 0:
                return {"stderr": compile_result.stderr}
            result = subprocess.run(["./temp_code_out"], capture_output=True, text=True)
        else:
            raise HTTPException(status_code=400, detail="Unsupported language")

        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "return_code": result.returncode,
        }
    finally:
        # Clean up temporary files
        os.remove(temp_code_filename)  
        if language in ["cpp", "rust"]:
            os.remove("temp_code_out")  

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)