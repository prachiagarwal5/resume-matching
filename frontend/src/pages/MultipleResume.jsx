import React, { useState ,useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css';

const MultipleResume = () => {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
   
    const [resumeUrl, setResumeUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

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

        console.log("Folder contents:", folderContents);

        // Example: Filter only PDF files
        const pdfFiles = folderContents.filter((file) => file.type === "application/pdf");
        console.log("PDF files:", pdfFiles);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     const formData = new FormData();
    //     formData.append('resume', resume);
    //     formData.append('jobDescription', jobDescription);

    // //     try {
    // //         const response = await axios.post('http://localhost:5001/api/analyze', formData, {
    // //             headers: {
    // //                 'Content-Type': 'multipart/form-data',
    // //             },
    // //         });
            
    // //         setResults(response.data);
    // //     } catch (error) {
    // //         console.error('Error uploading resume:', error);
    // //     } finally {
    // //         setLoading(false);
    // //     }
    // // };
    // Function to get the color based on score
    // const getScoreColor = (score) => {
    //     if (score < 40) return 'rgba(255, 99, 132, 0.6)'; // Red
    //     if (score < 80) return 'rgba(255, 206, 86, 0.6)'; // Yellow
    //     return 'rgba(75, 192, 192, 0.6)'; // Green
    // };

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center w-screen">
    {/* Navbar */}
    <nav className="bg-white dark:bg-gray-900 bg-opacity-80 text-purple-900 dark:text-purple-300 w-full p-4 shadow-lg flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">GLA Resume Fit</div>
        <div className="flex items-center space-x-4">
            {/* Add the Create Resume button */}
           
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
            {resumeUrl ? (
                <iframe
                    src={resumeUrl}
                    title="Resume Preview"
                    className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                    style={{ minHeight: '600px' }}
                />
            ) : (
                <img
                    src="https://resumekraft.com/wp-content/uploads/2022/07/Computer-Engineer-Resume-1.jpg"
                    alt="Resume Preview"
                    className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                />
            )}
        </div>

        {/* Upload Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-8 flex flex-col justify-center items-center rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
            <h2 className="text-purple-700 dark:text-purple-300 text-4xl font-bold mb-6 transform transition-transform duration-300 hover:scale-105">Upload Your Resumes</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-lg">
            Compare resumes to the job description and highlight the top-scoring candidate
            </p>
            <div className="folder-input">
            <label className="block text-gray-700 dark:text-gray-300">
                Select a folder:
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
                    <h3 className="text-gray-800 dark:text-gray-200 font-semibold">Selected Files:</h3>
                    <ul className="list-disc pl-5">
                        {files.map((file) => (
                            <li key={file.name} className="text-gray-700 dark:text-gray-300">
                                {file.webkitRelativePath}
                            </li>
                        ))}
                    </ul>
                   
                </div>
            )}
        </div>
            <div className="w-full mb-6">
                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">Job Description</label>
                <textarea
                    className="w-full h-32 px-4 py-3 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none transition duration-200 hover:border-purple-500 dark:hover:border-purple-300"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here"
                />
            </div>
            <button
        
                className="w-full bg-purple-700 dark:bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300 transform hover:scale-105"
            >
                {loading ? 'Analyzing...' : 'Analyze'}
            </button>
        </div>
    </div>
    </div>
)
}

export default MultipleResume;
