// Judge0 CE API for code execution (replaces Piston which is now whitelist-only)

const JUDGE0_API = import.meta.env.VITE_JUDGE0_API;

const LANGUAGE_CONFIG = {
  javascript: { id: 63, name: "JavaScript (Node.js 12.14.0)" },
  python: { id: 71, name: "Python (3.8.1)" },
  java: { id: 62, name: "Java (OpenJDK 13.0.1)" },
  c: { id: 50, name: "C (GCC 9.2.0)" },
  cpp: { id: 54, name: "C++ (GCC 9.2.0)" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const langConfig = LANGUAGE_CONFIG[language];

    if (!langConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: langConfig.id,
        }),
      }
    );

    console.log("Judge0 response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Judge0 error response:", errorText);
      return {
        success: false,
        error: `HTTP error! status: ${response.status} - ${errorText}`,
      };
    }

    const data = await response.json();
    console.log("Judge0 response data:", data);

    // Judge0 status ids: 3 = Accepted, 6 = Compilation Error, 11 = Runtime Error
    const { stdout, stderr, compile_output, status } = data;

    // Compilation error
    if (compile_output && status.id !== 3) {
      return {
        success: false,
        output: "",
        error: compile_output,
      };
    }

    // Runtime error or other failure
    if (status.id !== 3) {
      return {
        success: false,
        output: stdout || "",
        error: stderr || status.description || "Execution failed",
      };
    }

    // Successful execution
    return {
      success: true,
      output: stdout ? stdout.trim() : "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}