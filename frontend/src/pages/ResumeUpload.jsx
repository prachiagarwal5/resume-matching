import React, { useState } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [results, setResults] = useState(null);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', resume);
        formData.append('jobDescription', jobDescription);

        try {
            const response = await axios.post('http://localhost:5001/api/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-300 via-blue-100 to-blue-400 flex flex-col items-center justify-center w-screen">
            {/* Navbar */}
            <nav className="bg-white bg-opacity-50 text-blue-900 w-full p-4 shadow-lg flex justify-between items-center">
                <div className="text-3xl font-bold">GLA Resume Fit</div>
                <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4">Hi xyz</span>
                    <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center">P</div>
                </div>
            </nav>

            {/* Content Area */}
            <div className="w-full max-w-7xl mt-12 flex justify-between items-start bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Resume Image */}
                <div className="w-2/5 p-6">
                    <img
                        src="https://resumekraft.com/wp-content/uploads/2022/07/Computer-Engineer-Resume-1.jpg"
                        alt="Resume Preview"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Upload Section */}
                <div className="w-3/7 bg-gray-50 p-5 flex flex-col justify-center items-center mt-11 mr-11">
                    <h2 className="text-blue-700 text-2xl font-bold mb-6">Gla Resume Fit</h2>
                    <p className="text-gray-700 mb-6 text-center">
                        Parse your resume and get a detailed analysis report matching your job description.
                    </p>

                    <div className="w-full mb-6">
                        <label className="block mb-2 text-gray-700 font-semibold">Upload Resume (PDF)</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        />
                    </div>

                    <div className="w-full mb-6">
                        <label className="block mb-2 text-gray-700 font-semibold">Job Description</label>
                        <textarea
                            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-700 text-white py-3 rounded-lg shadow hover:bg-blue-800 transition duration-200"
                    >
                        Analyze
                    </button>
                </div>
            </div>

            {/* Results Display (if available) */}
            {results && (
                <div className="mt-12 bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Analysis Results</h3>
                    <div className="space-y-6">
                        {Object.entries(results).map(([key, value]) => (
                            <div key={key} className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">{key}</h2>
                                {Array.isArray(value) ? (
                                    value.map((item, index) => (
                                        <div key={index} className="ml-6 mb-4">
                                            {typeof item === 'object' && item !== null ? (
                                                Object.entries(item).map(([subKey, subValue], subIndex) => (
                                                    <div key={subIndex} className="mb-2">
                                                        <h3 className="text-lg font-medium text-gray-700">{subKey}:</h3>
                                                        <p className="ml-4 text-gray-600">
                                                            {JSON.stringify(subValue, null, 2)}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-600 ml-4">{JSON.stringify(item, null, 2)}</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 ml-4">{JSON.stringify(value, null, 2)}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;