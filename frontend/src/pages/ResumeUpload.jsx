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
        <div className="h-screen flex flex-col bg-black text-white w-screen">
            {/* Navbar */}
            <nav className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
                <div className="text-3xl font-bold">GLA ResumeFit</div>
                <div className="flex items-center space-x-4">
                    <p className="text-lg">Hi xyz</p>
                    <div className="relative">
                        <button className="focus:outline-none">
                            <span className="w-8 h-8 bg-white rounded-full inline-block text-black text-center leading-8">
                                {/* Profile icon or initials */}
                                P
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Content Area */}
            <div className="flex-grow flex flex-col justify-center items-center ">
                {/* Resume Upload & Job Description Inputs */}
                <div className="w-2/3 flex justify-between items-center mt-10 gap-11">
                    <div className="w-1/2 h-64 border-2 border-white rounded-lg flex justify-center items-center">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf"
                                className="hidden"
                            />
                            <span className="text-lg">Upload your resume</span>
                        </label>
                    </div>
                    <div className="w-1/2 h-64 border-2 border-white rounded-lg flex justify-center items-center">
                        <textarea
                            className="bg-transparent w-full h-full p-4 text-lg border-none outline-none"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Upload your job description"
                        />
                    </div>
                </div>

                {/* Analyze Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white text-lg py-2 px-8 rounded-lg"
                    >
                        Analyze
                    </button>
                </div>

                {/* Results Display (if available) */}
                {results && (
    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg w-2/3">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Analysis Results</h3>
        <div className="space-y-6">
            {Object.entries(results).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
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
                    ) : typeof value === 'object' && value !== null ? (
                        Object.entries(value).map(([subKey, subValue], subIndex) => (
                            <div key={subIndex} className="ml-6 mb-4">
                                <h3 className="text-lg font-medium text-gray-700">{subKey}:</h3>
                                <p className="ml-4 text-gray-600">
                                    {JSON.stringify(subValue, null, 2)}
                                </p>
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
        </div>
    );
};

export default ResumeUpload;
