import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Animation } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '@fortawesome/fontawesome-free/css/all.min.css';



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

    // Function to get the color based on score
    const getScoreColor = (score) => {
        if (score < 40) return 'rgba(255, 99, 132, 0.6)'; // Red
        if (score < 80) return 'rgba(255, 206, 86, 0.6)'; // Yellow
        return 'rgba(75, 192, 192, 0.6)'; // Green
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center w-screen">
            {/* Navbar */}
            <nav className="bg-white bg-opacity-80 text-purple-900 w-full p-4 shadow-lg flex justify-between items-center">
                <div className="text-3xl font-extrabold tracking-wide">GLA Resume Fit</div>
                <div className="flex items-center space-x-4">
                    

                    {/* Add the Create Resume button */}
                    <Link
                        to="/resume-creation"
                        className="bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition duration-300"
                    >
                        Create Resume
                    </Link>
                </div>
            </nav>

            {/* Content Area */}
            <div className="w-full max-w-7xl mt-12 grid grid-cols-2 gap-8 bg-white shadow-2xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
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
                <div className="bg-gray-50 p-8 flex flex-col justify-center items-center rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
            <h2 className="text-purple-700 text-4xl font-bold mb-6 transform transition-transform duration-300 hover:scale-105">Upload Your Resume</h2>
            <p className="text-gray-700 mb-6 text-center text-lg">
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
                className="w-full bg-purple-700 text-white py-3 rounded-lg shadow hover:bg-purple-800 transition duration-300 transform hover:scale-105"
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
                   {results.JScore !== undefined && results.GScore !== undefined && (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg transition duration-300 hover:bg-gray-200" style={{ width: '100%' }}>
        <table className="w-full">
            <thead>
                <tr>
                    <th className="text-lg font-semibold text-purple-600 text-left">
                        <i className="fas fa-chart-pie text-purple-600 text-2xl mr-2"></i>
                        General Score (GScore)
                    </th>
                    <th className="text-lg font-semibold text-purple-600 text-left">
                        <i className="fas fa-chart-pie text-purple-600 text-2xl mr-2"></i>
                        Score on the Basis of JD (JScore)
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2" style={{ width: '50%' }}>
                        <div className="relative" style={{ height: '200px' }}>
                            <Doughnut
                                data={{
                                    labels: ['GScore', 'Remaining'],
                                    datasets: [{
                                        data: [results.GScore, 100 - results.GScore],
                                        backgroundColor: [getScoreColor(results.GScore), 'rgba(211, 211, 211, 0.5)'],
                                        borderWidth: 0,
                                    }],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: (tooltipItem) => {
                                                    const label = tooltipItem.label === 'GScore' ? 'GScore: ' : 'Remaining: ';
                                                    return `${label} ${tooltipItem.raw}%`;
                                                },
                                            },
                                        },
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                                width={200}
                                height={200}
                            />
                            {/* GScore percentage in the center */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-3xl font-bold text-center text-gray-800">
                                    <span className={`font-bold ${getScoreColor(results.GScore)}`}>{results.GScore}</span>%
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="p-2" style={{ width: '50%' }}>
                        <div className="relative" style={{ height: '200px' }}>
                            <Doughnut
                                data={{
                                    labels: ['JScore', 'Remaining'],
                                    datasets: [{
                                        data: [results.JScore, 100 - results.JScore],
                                        backgroundColor: [getScoreColor(results.JScore), 'rgba(211, 211, 211, 0.5)'],
                                        borderWidth: 0,
                                    }],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: (tooltipItem) => {
                                                    const label = tooltipItem.label === 'JScore' ? 'JScore: ' : 'Remaining: ';
                                                    return `${label} ${tooltipItem.raw}%`;
                                                },
                                            },
                                        },
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                                width={200}
                                height={200}
                            />
                            {/* JScore percentage in the center */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-3xl font-bold text-center text-gray-800">
                                    <span className={`font-bold ${getScoreColor(results.JScore)}`}>{results.JScore}</span>%
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)}












                        {/* Job Title Match Section */}
{results['JobTitleMatch'] !== undefined && (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200 mt-5">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <span className="text-purple-600 text-2xl mr-2">
                <i className="fas fa-check-circle"></i> {/* Icon for Job Title Match */}
            </span>
            Job Title Match
        </h2>
        <p className="text-gray-700">
            {/* Display Match Status */}
            {results['Job Title Match'] ? (
                <span className="text-green-600 font-semibold">Matched</span>
            ) : (
                <span className="text-red-600 font-semibold">Not Matched</span>
            )}
        </p>
    </div>
)}

                        
                     {/* Skills Section */}
{results.Skills && (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">Skills</h2>
        <div className="ml-4">
            {Object.entries(results.Skills).map(([skillCategory, skills], index) => (
                <div key={index} className="mb-6">
                    <div className="flex items-center mb-4">
                        {/* Add an icon before each skill category */}
                        <span className="text-purple-600 text-2xl mr-3">
                            {/* Use different icons based on skill category */}
                            {skillCategory === "TechnicalSkills" ? (
                                <i className="fas fa-laptop-code"></i> // Laptop code icon for technical skills
                            ) : skillCategory === "SoftSkills" ? (
                                <i className="fas fa-comments"></i> // Comments icon for soft skills
                            ) : skillCategory === "DesignSkills" ? (
                                <i className="fas fa-paint-brush"></i> // Paint brush icon for design skills
                            ) : skillCategory === "CommunicationSkills" ? (
                                <i className="fas fa-volume-up"></i> // Volume up icon for communication skills
                            ) : (
                                <i className="fas fa-cogs"></i> // Default tools icon for other categories
                            )}
                        </span>
                        <h3 className="text-xl font-medium text-purple-600">{skillCategory}:</h3>
                    </div>
                    <table className="table-auto w-full text-left bg-white rounded-lg shadow-sm border border-gray-200">
                        <thead>
                            <tr className="bg-purple-100">
                                <th className="px-4 py-3 text-gray-700 font-semibold">Skill</th>
                                <th className="px-4 py-3 text-gray-700 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(skills).map(([skill, matched], skillIndex) => (
                                <tr key={skillIndex} className={`border-t ${skillIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition`}>
                                    <td className="px-4 py-3 text-gray-700">{skill}</td>
                                    <td className="px-4 py-3">
                                        {matched ? (
                                            <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                                &#10003; Matched
                                            </span>
                                        ) : (
                                            <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
                                                &#10007; Not Matched
                                            </span>
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
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <span className="text-purple-600 text-2xl mr-2">
                <i className="fas fa-star"></i> {/* Icon for Suggested Skills */}
            </span>
            Suggested Skills
        </h2>
        <ul className="grid grid-cols-2 gap-4 ml-4">
            {results['Suggested Skills'].map((skill, index) => (
                <li key={index} className="flex items-center text-gray-600">
                    {/* Icon next to skill */}
                    <span className="text-purple-600 text-lg mr-2">
                        <i className="fas fa-check-circle"></i> {/* Font Awesome icon */}
                    </span>
                    {/* Skill Name */}
                    {skill}
                </li>
            ))}
        </ul>
    </div>
)}


{/* Matched Projects And Internships Section */}
{results['Matched Projects And Internships'] && results['Matched Projects And Internships'].length > 0 && (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <span className="text-purple-600 text-2xl mr-2">
                <i className="fas fa-project-diagram"></i> {/* Icon for Projects */}
            </span>
            Matched Projects And Internships
        </h2>
        <table className="min-w-full table-auto bg-white border-collapse">
            <thead>
                <tr className="bg-purple-100">
                    <th className="px-4 py-2 text-left text-gray-700">Project No.</th>
                    <th className="px-4 py-2 text-left text-gray-700">Project Name</th>
                    <th className="px-4 py-2 text-left text-gray-700">Description</th>
                </tr>
            </thead>
            <tbody>
                {results['Matched Projects And Internships'].map((project, index) => (
                    <tr key={index} className="border-t border-gray-300">
                        <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                        <td className="px-4 py-2 text-gray-800 font-semibold">{project.Project}</td>
                        <td className="px-4 py-2 text-gray-600">{project.Description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

{/* Project Title Description Check Section */}
{results['Project Title Description Check'] && results['Project Title Description Check'].length > 0 && (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200 mt-5">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <span className="text-purple-600 text-2xl mr-2">
                <i className="fas fa-clipboard-list"></i> {/* Icon for Project Title Check */}
            </span>
            Project Title Description Check
        </h2>
        <table className="min-w-full table-auto bg-white border-collapse">
            <thead>
                <tr className="bg-purple-100">
                    <th className="px-4 py-2 text-left text-gray-700">Project</th>
                    <th className="px-4 py-2 text-left text-gray-700">Status</th>
                    <th className="px-4 py-2 text-left text-gray-700">Explanation</th>
                </tr>
            </thead>
            <tbody>
                {results['Project Title Description Check'].map((item, index) => (
                    <tr key={index} className="border-t border-gray-300">
                        <td className="px-4 py-2 text-gray-800 font-semibold">{item.Project}</td>

                        {/* Status with styled span */}
                        <td className="px-4 py-2">
                            {item.Status === 'Matched' ? (
                                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                                    &#10003; Matched
                                </span>
                            ) : (
                                <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
                                    &#10007; Not Matched
                                </span>
                            )}
                        </td>

                        <td className="px-4 py-2 text-gray-600">{item.Explanation}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}


{/* Rephrased Projects And Internships Section */}
{results['Rephrased Projects And Internships'] && results['Rephrased Projects And Internships'].length > 0 && (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200 mt-5">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <span className="text-purple-600 text-2xl mr-2">
                <i className="fas fa-retweet"></i> {/* Icon for Rephrased Projects */}
            </span>
            Rephrased Projects And Internships
        </h2>
        <table className="min-w-full table-auto bg-white border-collapse">
            <thead>
                <tr className="bg-purple-100">
                    <th className="px-4 py-2 text-left text-gray-700">Project No.</th>
                    <th className="px-4 py-2 text-left text-gray-700">Original Project</th>
                    <th className="px-4 py-2 text-left text-gray-700">Rephrased Project(s)</th>
                </tr>
            </thead>
            <tbody>
                {results['Rephrased Projects And Internships'].map((item, index) => (
                    <tr key={index} className="border-t border-gray-300">
                        <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                        <td className="px-4 py-2 text-gray-800 font-semibold">{item['Original Project']}</td>

                        {/* Handle array of rephrased projects */}
                        <td className="px-4 py-2 text-gray-600">
                            <ul className="list-disc list-inside">
                                {item['Rephrased Project'].map((rephrased, rephrasedIndex) => (
                                    <li key={rephrasedIndex}>{rephrased}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}




{/* Resume Improvement Suggestions Section */}
{results['Resume Improvement Suggestions'] && (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6 flex items-center">
            <span className="text-purple-600 text-2xl mr-2">
                <i className="fas fa-lightbulb"></i> {/* Icon for suggestions */}
            </span>
            Resume Improvement Suggestions
        </h2>
        <ul className="ml-6">
            {results['Resume Improvement Suggestions'].map((suggestion, index) => (
                <li
                    key={index}
                    className="flex items-start mb-4 text-gray-700 transition duration-200 hover:bg-purple-50 hover:shadow-sm p-3 rounded-lg"
                >
                    {/* Icon */}
                    <span className="text-purple-600 text-xl mr-3">
                        <i className="fas fa-lightbulb"></i> {/* Icon for suggestion */}
                    </span>
                    {/* Suggestion Text */}
                    <p className="text-gray-700 text-base font-medium">
                        {suggestion}
                    </p>
                </li>
            ))}
        </ul>
    </div>
)}


{/* Grammatical Check Section */}
{results['Grammatical Check'] && (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <span className="text-purple-600 text-2xl mr-2">
                <i className="fas fa-check-circle"></i> {/* Icon for grammatical check */}
            </span>
            Grammatical Check
        </h2>
        <div className="text-gray-800">
            {/* Check if the grammatical check result is an array of issues */}
            {Array.isArray(results['Grammatical Check']) ? (
                <ul className="list-disc list-inside ml-6">
                    {results['Grammatical Check'].map((issue, index) => (
                        <li key={index} className="mb-2">
                            {/* Highlight issues with potential errors */}
                            <span className="text-red-600 font-semibold">{issue.error}</span>
                            <span> - {issue.suggestion}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{results['Grammatical Check']}</p> // Fallback if not an array
            )}
        </div>
    </div>
)}


{/* Recruiter Tips Section */}
{results['Recruiter Tips'] && (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200 mt-5">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <span className="text-purple-600 text-2xl mr-2">
                <i className="fas fa-user-tie"></i> {/* Icon for Recruiter Tips */}
            </span>
            Recruiter Tips
        </h2>

        {/* Suggestions Section */}
        <div className="mb-6">
            <h3 className="font-semibold">Suggestions:</h3>
            <ul className="list-disc list-inside">
                {results['Recruiter Tips'].Suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </div>

        {/* Word Count Section */}
        <div className="mb-6 font-semibold">
            <p>Word Count: {results['Recruiter Tips']['Word Count']}</p> 
        </div>

        {/* WordsToAvoid Section */}
        <div className="mb-6">
            <h3 className="font-semibold">Words To Avoid:</h3>
            <table className="min-w-full table-auto bg-white border-collapse">
                <thead>
                    <tr className="bg-purple-100">
                        <th className="px-4 py-2 text-left text-gray-700">Word</th>
                        <th className="px-4 py-2 text-left text-gray-700">Suggested Alternative</th>
                    </tr>
                </thead>
                <tbody>
                    {results['Recruiter Tips'].wordsToAvoid &&
                        Object.entries(results['Recruiter Tips'].wordsToAvoid).map(([word, alternative], index) => (
                            <tr key={index} className="border-t border-gray-300">
                                <td className="px-4 py-2 text-gray-700">{word}</td>
                                <td className="px-4 py-2 text-gray-700">{alternative}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
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
