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
            const response = await axios.post('http://localhost:5000/api/analyze', formData, {
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
                    <div className="mt-8 bg-white text-black p-4 rounded-lg w-2/3">
                        <h3 className="text-xl font-bold">Analysis Results</h3>
                        <pre className="mt-4 whitespace-pre-wrap">{JSON.stringify(results, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;
