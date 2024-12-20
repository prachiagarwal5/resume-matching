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
        <div className="min-h-screen bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center w-screen">
    {/* Navbar */}
    <nav className="bg-white dark:bg-gray-900 bg-opacity-80 text-purple-900 dark:text-purple-300 w-full p-4 shadow-lg flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">GLA Resume Fit</div>
        <div className="flex items-center space-x-4">
            {/* Add the Create Resume button */}
            <Link
                to="/"
                className="bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
            >
                ATS Analyzer
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
            {resumeUrl ? (
                <iframe
                    src={resumeUrl}
                    title="Resume Preview"
                    className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                    style={{ minHeight: '600px' }}
                />
            ) : (
                <img
                    src="https://assets.website-files.com/5ffd61d36b01f7a71eb30509/60364829a7907272fdada1d1_DevOps%20Engineer-1.png"
                    alt="Resume Preview"
                    className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                />
            )}
        </div>

        {/* Upload Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-8 flex flex-col justify-center items-center rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
            <h2 className="text-purple-700 dark:text-purple-300 text-4xl font-bold mb-6 transform transition-transform duration-300 hover:scale-105">Upload Your Resume</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-lg">
                Compare resumes to the job description and highlight the top-scoring candidate
            </p>
            <div className="w-full mb-6">
                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">Upload Resume (PDF)</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:outline-none transition duration-200 hover:border-purple-500 dark:hover:border-purple-300"
                />
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
                onClick={handleSubmit}
                className="w-full bg-purple-700 dark:bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300 transform hover:scale-105"
            >
                {loading ? 'Analyzing...' : 'Analyze'}
            </button>
        </div>
    </div>


            {/* Results Display (if available) */}
            {results && (
                <div className="mt-12 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-7xl">
                <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                    Analysis Results
                </h3>
                <div className="space-y-6">

                      
                 {/* Score Section */}
{results.JScore !== undefined && results.GScore !== undefined && (
    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 mt-5">
        <table className="w-full">
            <thead>
                <tr>
                    <th className="text-lg font-semibold text-purple-600 dark:text-purple-300 text-left p-4">
                        <i className="fas fa-chart-pie text-purple-600 dark:text-purple-300 text-2xl mr-2"></i>
                        General Score (GScore)
                    </th>
                    <th className="text-lg font-semibold text-purple-600 dark:text-purple-300 text-left p-4">
                        <i className="fas fa-chart-pie text-purple-600 dark:text-purple-300 text-2xl mr-2"></i>
                        Score on the Basis of JD (JScore)
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-4" style={{ width: '50%' }}>
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
                                <p className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
                                    <span className={`font-bold ${getScoreColor(results.GScore)}`}>{results.GScore}</span>%
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="p-4" style={{ width: '50%' }}>
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
                                <p className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
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
{results['Job Title Match'] !== undefined && (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-2x">
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-300 mb-4 flex items-center">
            <span className="text-2xl mr-2">
                <i className={`fas fa-${results['Job Title Match'] === 'Matched' ? 'check-circle' : 'times-circle'} text-${results['Job Title Match'] === 'Matched' ? 'green-500 dark:text-green-400' : 'red-500 dark:text-red-400'}`}></i>
            </span>
            Job Title Match
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-lg">
            {results['Job Title Match'] === 'Matched' ? (
                <span className="text-green-600 dark:text-green-400 font-semibold flex items-center">
                    <i className="fas fa-thumbs-up mr-2"></i> Matched
                </span>
            ) : (
                <span className="text-red-600 dark:text-red-400 font-semibold flex items-center">
                    <i className="fas fa-thumbs-down mr-2"></i> Not Matched
                </span>
            )}
        </p>
    </div>
)}

                        
                     {/* Skills Section */}
            {results.Skills && (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
                    <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-6">Skills</h2>
                    <div className="ml-4">
                        {Object.entries(results.Skills).map(([skillCategory, skills], index) => (
                            <div key={index} className="mb-6">
                                <div className="flex items-center mb-4">
                                    <span className="text-purple-600 dark:text-purple-300 text-2xl mr-3">
                                        {skillCategory === "TechnicalSkills" ? (
                                            <i className="fas fa-laptop-code"></i>
                                        ) : skillCategory === "SoftSkills" ? (
                                            <i className="fas fa-comments"></i>
                                        ) : skillCategory === "DesignSkills" ? (
                                            <i className="fas fa-paint-brush"></i>
                                        ) : skillCategory === "CommunicationSkills" ? (
                                            <i className="fas fa-volume-up"></i>
                                        ) : (
                                            <i className="fas fa-cogs"></i>
                                        )}
                                    </span>
                                    <h3 className="text-xl font-medium text-purple-600 dark:text-purple-300">{skillCategory}:</h3>
                                </div>
                                <table className="table-auto w-full text-left bg-white dark:bg-gray-600 rounded-lg shadow-sm border border-gray-200 dark:border-gray-500">
                                    <thead>
                                        <tr className="bg-purple-100 dark:bg-purple-800">
                                            <th className="px-4 py-3 text-gray-700 dark:text-gray-200 font-semibold">Skill</th>
                                            <th className="px-4 py-3 text-gray-700 dark:text-gray-200 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(skills).map(([skill, matched], skillIndex) => (
                                            <tr key={skillIndex} className={`border-t ${skillIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : 'bg-white dark:bg-gray-700'} hover:bg-purple-50 dark:hover:bg-purple-800 transition`}>
                                                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{skill}</td>
                                                <td className="px-4 py-3">
                                                    {matched ? (
                                                        <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-800 rounded-full">
                                                            &#10003; Matched
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-800 rounded-full">
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
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl mt-5">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-tools"></i> {/* Icon for Suggested Skills */}
            </span>
            Suggested Skills
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results['Suggested Skills'].map((skill, index) => (
                <div
                    key={index}
                    className="relative p-5 bg-white dark:bg-gray-700 rounded-lg shadow-md transition duration-200 hover:shadow-lg group"
                >
                    {/* Skill Indicator */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-purple-600 dark:bg-purple-300 rounded-t-lg group-hover:bg-purple-500"></div>

                    {/* Skill Content */}
                    <div className="flex items-center">
                        <span className="text-purple-600 dark:text-purple-300 text-3xl mr-3">
                            <i className="fas fa-check"></i> {/* Skill Icon */}
                        </span>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {skill}
                        </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 bg-purple-50 dark:bg-purple-900 group-hover:opacity-20"></div>
                </div>
            ))}
        </div>
    </div>
)}

{/* Matched Projects And Internships Section */}
{results['Matched Projects And Internships'] && results['Matched Projects And Internships'].length > 0 && (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl mt-5">
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-300 mb-6 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-project-diagram"></i> {/* Icon for Projects */}
            </span>
            Matched Projects And Internships
        </h2>

        {/* Grid layout for projects/internships */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results['Matched Projects And Internships'].map((project, index) => (
                <div
                    key={index}
                    className="p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md transition duration-200 hover:shadow-lg hover:bg-green-50 dark:hover:bg-green-900"
                >
                    <div className="flex justify-between items-center mb-3">
                        {/* Project/Internship Type Icon */}
                        <div className="flex items-center">
                            {project.Project ? (
                                <i className="fas fa-folder-open text-purple-600 dark:text-purple-300 mr-2"></i>
                            ) : (
                                <i className="fas fa-briefcase text-purple-600 dark:text-purple-300 mr-2"></i>
                            )}
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {project.Project || project.Internship}
                            </h3>
                        </div>
                        {/* Status Icon for Matched */}
                        <div>
                            <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                                Matched
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {project.Description}
                    </p>
                </div>
            ))}
        </div>
    </div>
)}




{/* Project Title Description Check Section */}
{results['Project Title Description Check'] && results['Project Title Description Check'].length > 0 && (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl mt-5">
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-300 mb-6 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-tasks"></i> {/* Icon for Project Check */}
            </span>
            Project Title Description Check
        </h2>

        {/* Card Layout for each project check */}
        <div className="grid grid-cols-1 gap-6">
            {results['Project Title Description Check'].map((item, index) => (
                <div
                    key={index}
                    className={`relative p-5 rounded-lg shadow-md transition duration-200 border-l-4 ${
                        item.Status === 'Matched'
                            ? 'border-green-500 bg-green-50 dark:bg-green-900'
                            : 'border-red-500 bg-red-50 dark:bg-red-900'
                    }`}
                >
                    {/* Status Icon in Top-Right Corner */}
                    <div className="absolute top-2 right-2">
                        {item.Status === 'Matched' ? (
                            <i className="fas fa-check-circle text-green-700 dark:text-green-300 text-xl"></i>
                        ) : (
                            <i className="fas fa-times-circle text-red-700 dark:text-red-300 text-xl"></i>
                        )}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        {item.Project}
                    </h3>

                    {/* Explanation */}
                    <p className="text-gray-700 dark:text-gray-300">
                        {item.Explanation}
                    </p>
                </div>
            ))}
        </div>
    </div>
)}



{/* Rephrased Projects And Internships Section */}
{results['Rephrased Projects And Internships'] && results['Rephrased Projects And Internships'].length > 0 && (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg mt-5">
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-300 mb-6 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-sync-alt"></i> {/* Icon for rephrasing */}
            </span>
            Rephrased Projects And Internships
        </h2>

        {/* Card-Based Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results['Rephrased Projects And Internships'].map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition duration-200">
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Project/Internship {index + 1}
                        </h3>
                        <span className="text-gray-600 dark:text-gray-300">
                            <i className="fas fa-project-diagram"></i> {/* Icon */}
                        </span>
                    </div>
                    
                    {/* Original Project */}
                    <p className="mb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Original:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{item['Original Project']}</span>
                    </p>

                    {/* Rephrased Projects */}
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Rephrased:</p>
                    <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400">
                        {item['Rephrased Project'].map((rephrased, rephrasedIndex) => (
                            <li key={rephrasedIndex} className="mb-1">
                                {rephrased}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
)}




{/* Resume Improvement Suggestions Section */}
{results['Resume Improvement Suggestions'] && (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl mt-5">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-300 mb-6 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-lightbulb"></i> {/* Icon for suggestions */}
            </span>
            Resume Improvement Suggestions
        </h2>

        {/* Suggestion List */}
        <ul className="ml-4 space-y-4">
            {results['Resume Improvement Suggestions'].map((suggestion, index) => (
                <li
                    key={index}
                    className="flex items-start p-4 bg-gray-100 dark:bg-gray-700 rounded-lg transition duration-200 hover:bg-purple-50 dark:hover:bg-purple-900 shadow-sm hover:shadow-md"
                >
                    {/* Icon for each suggestion */}
                    <span className="text-purple-500 dark:text-purple-300 text-xl mr-3">
                        <i className="fas fa-arrow-right"></i> {/* Different icon for suggestion */}
                    </span>
                    {/* Suggestion Text */}
                    <p className="text-gray-800 dark:text-gray-300 text-base font-medium">
                        {suggestion}
                    </p>
                </li>
            ))}
        </ul>
    </div>
)}


{/* Grammatical Check Section */}
{results['Grammatical Check'] && (
    <div className="p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-300 mb-4 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-spell-check"></i> {/* Icon for grammatical check */}
            </span>
            Grammatical Check
        </h2>
        <div className="space-y-4">
            {Array.isArray(results['Grammatical Check']) ? (
                <div className="space-y-6">
                    {results['Grammatical Check'].map((item, index) => {
                        // Every two consecutive items correspond to Original and Suggested.
                        if (index % 2 === 0) {
                            const original = results['Grammatical Check'][index];
                            const suggested = results['Grammatical Check'][index + 1]; // Pair it with the next element
                            
                            return (
                                <div key={index} className="p-4 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500">
                                    <p className="text-gray-900 dark:text-gray-100 mb-2">
                                        <span className="font-bold text-red-600 dark:text-red-400">Original: </span>
                                        {original.replace("Original: ", "").replace(/['"]+/g, '').trim()}
                                    </p>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        <span className="font-bold text-green-600 dark:text-green-400">Suggested: </span>
                                        {suggested.replace("Suggested: ", "").replace(/['"]+/g, '').trim()}
                                    </p>
                                </div>
                            );
                        } else {
                            return null; // Skip the "Suggested" as it's already displayed in the pair
                        }
                    })}
                </div>
            ) : (
                <p className="text-gray-900 dark:text-gray-300">{results['Grammatical Check']}</p>
            )}
        </div>
    </div>
)}



{/* Recruiter Tips Section */}
{results['Recruiter Tips'] && (
    <div className="p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white dark:bg-gray-800 mt-5">
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-300 mb-4 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-user-tie"></i> {/* Icon for Recruiter Tips */}
            </span>
            Recruiter Tips
        </h2>

        {/* Suggestions Section */}
        <div className="mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <i className="fas fa-lightbulb text-yellow-500 dark:text-yellow-300 mr-2"></i> 
                Suggestions:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {results['Recruiter Tips'].Suggestions.map((suggestion, index) => (
                    <li key={index} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>

        {/* Word Count Section */}
        <div className="mb-6">
            <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 font-semibold">
                <i className="fas fa-file-word text-blue-500 dark:text-blue-300"></i>
                <p>Word Count: {results['Recruiter Tips']['Word Count']}</p>
            </div>
        </div>

        {/* Words To Avoid Section */}
<div className="mb-6">
    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
        <i className="fas fa-exclamation-triangle text-red-500 dark:text-red-400 mr-2"></i> 
        Words To Avoid:
    </h3>
    <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 border-collapse rounded-lg shadow-md">
            <thead>
                <tr className="bg-purple-100 dark:bg-purple-900 text-left">
                    <th className="px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold">Word</th>
                    <th className="px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold">Suggested Alternative</th>
                </tr>
            </thead>
            <tbody>
                {results['Recruiter Tips'].wordsToAvoid &&
                    Object.entries(results['Recruiter Tips'].wordsToAvoid).map(([word, alternative], index) => (
                        <tr
                            key={index}
                            className={`border-t border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{word}</td>
                            <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{alternative}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
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
