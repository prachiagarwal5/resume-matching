import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AnalyzeImage from './Analyze-rafiki.svg';


function MultipleResume() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFileName, setDownloadFileName] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDownloadUrl(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("resumes", file));
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post(
        "https://resumeanalyser-nhai.onrender.com/api/analyze/multiple",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Create download URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
      setDownloadFileName(`resume_analysis_${Date.now()}.xlsx`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", downloadFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleFolderChange = (event) => {
    const selectedFiles = event.target.files; // FileList containing all files
    const fileArray = Array.from(selectedFiles);

    // Check if the file count exceeds the limit
    if (fileArray.length > 50) {
        setError("You can upload a maximum of 50 files only.");
        setFiles([]);
        event.target.value = ""; // Clear the input
        return;
    }

    setError(""); // Clear any previous error
    setFiles(fileArray); // Store the files for further processing

    const folderContents = fileArray.map((file) => ({
        name: file.name,
        path: file.webkitRelativePath, // Path relative to the folder
        size: file.size, // File size in bytes
        type: file.type, // MIME type
    }));

    // Example: Filter only PDF files
    const pdfFiles = folderContents.filter((file) => file.type === "application/pdf");
    
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center w-screen">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 bg-opacity-80 text-purple-900 dark:text-purple-300 w-full p-4 shadow-lg flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">
          GLA Resume Fit
        </div>
        <div className="flex items-center space-x-4">
          <Link
                          to="/resume"
                          className="bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
                      >
                          Resume Analyzer
                      </Link>
          <Link
            to="/resume-creation"
            className="bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
          >
            Create Resume
          </Link>
        </div>
      </nav>

      {/* Content Area */}
      <div className="w-full max-w-7xl mt-12 grid grid-cols-2 gap-8 bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden transition-transform transform">
        {/* Resume Preview */}
        <div className="p-6 flex flex-col items-center">
        <img
              src={AnalyzeImage}
              alt="Resume Preview"
              className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            />
          {/* {downloadUrl ? (
            <iframe
              src={downloadUrl}
              title="Resume Analysis"
              className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
              style={{ minHeight: "600px" }}
            />
          ) : (
            <img
              src="https://resumekraft.com/wp-content/uploads/2022/07/Computer-Engineer-Resume-1.jpg"
              alt="Resume Preview"
              className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            />
          )} */}
        </div>

        {/* Upload Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-8 flex flex-col justify-center items-center rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
          <h2 className="text-purple-700 dark:text-purple-300 text-4xl font-bold mb-6">
            Upload Your Resumes
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-lg">
            Compare resumes to the job description and highlight the top-scoring
            candidate.
          </p>
          <div className="folder-input">
    <label className="block text-gray-700 dark:text-gray-300">
        Select Resumes(50 resumes only)
    </label>
    <input
        type="file"
        webkitdirectory="true"
        onChange={handleFolderChange}
        accept=".pdf"
        ref={fileInputRef}
        className="w-full px-4 py-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none transition duration-200 hover:border-purple-500 dark:hover:border-purple-300"
    />
    {error && <p className="text-red-500 mt-2">{error}</p>}
    {files.length > 0 && (
        <div className="mt-4">
            <h3 className="text-gray-800 dark:text-gray-200 font-semibold">Selected Folder:</h3>
            <p className="text-gray-700 dark:text-gray-300">
                {files[0].webkitRelativePath.split('/')[0]}
            </p>
        </div>
    )}
</div>
          <div className="w-full mb-6">
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">
              Job Description
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none transition duration-200 hover:border-purple-500 dark:hover:border-purple-300"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || files.length === 0 || !jobDescription}
            className="w-full bg-purple-700 dark:bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300 transform hover:scale-105"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          {downloadUrl && (
            <button
              onClick={handleDownload}
              className="w-full bg-green-700 dark:bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-800 dark:hover:bg-green-500 transition duration-300 transform hover:scale-105 mt-4"
            >
              Download Analysis
            </button>
          )}
          {loading && (
            <div className="mt-4 text-center">
              <p>Processing {files.length} resume(s)...</p>
              {/* You can add a progress bar here if needed */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                <div
                    className="bg-purple-600 h-2.5 rounded-full animate-pulse"
                    style={{ width: '100%' }}
                ></div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MultipleResume;
