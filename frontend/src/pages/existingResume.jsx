import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const UploadResume = () => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setError(""); // Clear any previous errors
  };

  useEffect(() => {
    // Check if the user is logged in by checking for the user ID in local storage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID is required. Please log in.");
      navigate("/"); // Redirect to login page if user is not logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resume) {
      const formData = new FormData();
      formData.append("resume", resume);

      // Retrieve the user ID from local storage or another source
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID is required. Please log in.");
        return;
      }
      formData.append("userId", userId);

      try {
        const response = await axios.post(
          "http://localhost:5001/api/form/upload-resume",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log("Resume uploaded successfully:", response.data);
        navigate("/resume-creation", {
          state: { resumeData: response.data.data },
        });
      } catch (error) {
        console.error("Error uploading resume:", error);

        // Log detailed error information for debugging
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error(
            "Request made but no response received:",
            error.request,
          );
        } else {
          console.error("Error setting up the request:", error.message);
        }

        // Set a user-friendly error message
        setError(
          error.response?.data?.message ||
            "An unexpected error occurred while uploading the resume. Please try again later.",
        );
      }
    } else {
      setError("Please select a resume to upload.");
    }
  };

  const handleCreateResume = () => {
    navigate("/resume-creation");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 w-screen">
      <nav className="bg-white dark:bg-gray-900 bg-opacity-80 text-purple-900 dark:text-purple-300 w-full p-4 shadow-lg flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">
          GLA Resume Fit
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
          >
            ATS Analyzer
          </Link>
          <Link
            to="/resume"
            className="bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
          >
            Create Resume
          </Link>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-purple-700 dark:text-purple-300 mb-6">
            Upload Your Resume
          </h2>
          {error && (
            <div className="mb-4 text-red-600 dark:text-red-400 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 dark:bg-purple-600 text-white py-2 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
            >
              Submit
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Don't have a resume?
            </p>
            <button
              onClick={handleCreateResume}
              className="bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
            >
              Create Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
