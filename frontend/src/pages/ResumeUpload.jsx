import React, { useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const ResumeUpload = () => {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [results, setResults] = useState(null);
    const [resumeUrl, setResumeUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setResumeUrl(fileURL);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    // Function to determine score segments
    const getScoreSegment = (score) => {
        if (score < 40) return { color: 'bg-red-500', text: 'Low' };
        if (score < 80) return { color: 'bg-yellow-500', text: 'Medium' };
        return { color: 'bg-green-500', text: 'High' };
    };

    // Function to determine the widths of each segment
    const getSegmentWidths = (score) => {
        const lowWidth = Math.max(0, Math.min(score, 40));
        const mediumWidth = Math.max(0, Math.min(score - 40, 40));
        const highWidth = Math.max(0, score - 80);

        return {
            low: (lowWidth / 100) * 100,
            medium: (mediumWidth / 100) * 100,
            high: (highWidth / 100) * 100,
        };
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center w-screen">
            {/* Navbar */}
            <nav className="bg-white bg-opacity-80 text-purple-900 w-full p-4 shadow-lg flex justify-between items-center">
                <div className="text-3xl font-extrabold tracking-wide">GLA Resume Fit</div>
                <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4">Hi xyz</span>
                    <div className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center">P</div>
                </div>
            </nav>

            {/* Content Area */}
            <div className="w-full max-w-7xl mt-12 grid grid-cols-2 gap-8 bg-white shadow-2xl rounded-lg overflow-hidden">
                {/* Resume Preview */}
                <div className="p-6">
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
                <div className="bg-gray-50 p-8 flex flex-col justify-center items-center">
                    <h2 className="text-purple-700 text-3xl font-bold mb-6">Upload Your Resume</h2>
                    <p className="text-gray-700 mb-6 text-center">
                        Get a detailed analysis report matching your job description by parsing your resume.
                    </p>

                    <div className="w-full mb-6">
                        <label className="block mb-2 text-gray-700 font-semibold">Upload Resume (PDF)</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none transition duration-200 hover:border-purple-500"
                        />
                    </div>

                    <div className="w-full mb-6">
                        <label className="block mb-2 text-gray-700 font-semibold">Job Description</label>
                        <textarea
                            className="w-full h-32 px-4 py-3 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none transition duration-200 hover:border-purple-500"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-purple-700 text-white py-3 rounded-lg shadow hover:bg-purple-800 transition duration-300"
                    >
                        {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </div>

            {/* Results Display (if available) */}
            {results && (
                <div className="mt-12 bg-white p-10 rounded-lg shadow-lg w-full max-w-7xl">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Analysis Results</h3>
                    <div className="space-y-6">

                       {/* Score Section */}
                      {/* Score Section */}
                        {results.Score !== undefined && (
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
                                <h2 className="text-xl font-semibold text-purple-600 mb-4">Score</h2>
                                
                                {/* Progress Bar */}
                                <div className="flex items-center justify-between">
                                    <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`${getScoreSegment(results.Score).color} h-full rounded-full transition-all duration-1000`}
                                            style={{ width: `${getSegmentWidths(results.Score).low}%` }}
                                        />
                                        <div
                                            className={`${getScoreSegment(results.Score).color} h-full rounded-full transition-all duration-1000 absolute top-0 left-0`}
                                            style={{ width: `${getSegmentWidths(results.Score).medium}%` }}
                                        />
                                        <div
                                            className={`${getScoreSegment(results.Score).color} h-full rounded-full transition-all duration-1000 absolute top-0 left-0`}
                                            style={{ width: `${getSegmentWidths(results.Score).high}%` }}
                                        />
                                    </div>
                                </div>
                                <p className="text-center mt-2 text-lg font-medium">
                                    Score: <span className={`font-bold ${getScoreSegment(results.Score).color}`}>{results.Score}</span>
                                </p>
                                <p className="text-center text-gray-600">{getScoreSegment(results.Score).text}</p>
                            </div>
                        )}
                        
                        {/* Skills Section */}
                        {results.Skills && (
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
                                <h2 className="text-xl font-semibold text-purple-600 mb-4">Skills</h2>
                                <div className="ml-4">
                                    {Object.entries(results.Skills).map(([skillCategory, skills], index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="text-lg font-medium text-gray-700">{skillCategory}:</h3>
                                            <table className="table-auto w-full text-left">
                                                <tbody>
                                                    {Object.entries(skills).map(([skill, matched], skillIndex) => (
                                                        <tr key={skillIndex} className="border-t">
                                                            <td className="px-4 py-2 text-gray-700">{skill}</td>
                                                            <td className="px-4 py-2">
                                                                {matched ? (
                                                                    <span className="text-green-600 font-bold">&#10003;</span>
                                                                ) : (
                                                                    <span className="text-red-600 font-bold">&#10007;</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggested Skills Section */}
                        {results['Suggested Skills'] && (
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
                                <h2 className="text-xl font-semibold text-purple-600 mb-4">Suggested Skills</h2>
                                <ul className="list-disc ml-6">
                                    {results['Suggested Skills'].map((skill, index) => (
                                        <li key={index} className="text-gray-600">{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Matched Projects And Internships Section */}
                        {results['Matched Projects And Internships'] && (
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
                                <h2 className="text-xl font-semibold text-purple-600 mb-4">Matched Projects And Internships</h2>
                                <div className="ml-4">
                                    {results['Matched Projects And Internships'].map((project, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="text-lg font-medium text-gray-700">Project {index + 1}:</h3>
                                            <p className="text-gray-800 font-semibold">Project Name: {project.project}</p>
                                            <p className="text-gray-600">Description: {project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rephrased Projects And Internships Section */}
                        {results['Rephrased Projects And Internships'] && (
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
                                <h2 className="text-xl font-semibold text-purple-600 mb-4">Rephrased Projects And Internships</h2>
                                <div className="ml-4">
                                    {results['Rephrased Projects And Internships'].map((item, index) => (
                                        <div key={index} className="mb-4">
                                            <p className="text-gray-800 font-semibold">Original Project: {item.originalProject}</p>
                                            <p className="text-gray-600">Rephrased Project: {item.rephrasedProject}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Resume Improvement Suggestions Section */}
                        {results['Resume Improvement Suggestions'] && (
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
                                <h2 className="text-xl font-semibold text-purple-600 mb-4">Resume Improvement Suggestions</h2>
                                <ul className="list-disc ml-6">
                                    {results['Resume Improvement Suggestions'].map((suggestion, index) => (
                                        <li key={index} className="text-gray-600">{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Grammatical Check Section */}
                        {results['Grammatical Check'] && (
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
                                <h2 className="text-xl font-semibold text-purple-600 mb-4">Grammatical Check</h2>
                                <p className="text-gray-800">{results['Grammatical Check']}</p>
                            </div>
                        )}

                        {/* Recruiter Tips Section */}
      {results['Recruiter Tips'] && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200 mt-5">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Recruiter Tips</h2>
          <h3 className="font-semibold">Suggestions:</h3>
          <ul className="list-disc list-inside mb-2">
            {results['Recruiter Tips'].Suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
          <p><strong>Word Count:</strong> {results['Recruiter Tips'].WordCount}</p>
          <h3 className="font-semibold">Words to Avoid:</h3>
          <ul className="list-disc list-inside mb-2">
            {results['Recruiter Tips'].WordsToAvoid.wordsToAvoid.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
          <h3 className="font-semibold">Suggested Alternatives:</h3>
          <ul className="list-disc list-inside">
            {results['Recruiter Tips'].WordsToAvoid.suggestedAlternatives.map((alternative, index) => (
              <li key={index}>{alternative}</li>
            ))}
          </ul>
        </div>
      )}
                        
                    </div>
                </div>
            )}

            <div className="h-16"></div>

        </div>
    );
};

export default ResumeUpload;
