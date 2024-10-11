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
                to="/resume-creation"
                className="bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
            >
                Create Resume
            </Link>
        </div>
    </nav>

    {/* Content Area */}
    <div className="w-full max-w-7xl mt-12 grid grid-cols-2 gap-8 bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
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
            <h2 className="text-purple-700 dark:text-purple-300 text-4xl font-bold mb-6 transform transition-transform duration-300 hover:scale-105">Upload Your Resume</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-lg">
                Get a detailed analysis report matching your job description by parsing your resume.
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
            {results['JobTitleMatch'] !== undefined && (
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 mt-5">
                    <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-300 mb-4 flex items-center">
                        <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                            <i className="fas fa-check-circle"></i>
                        </span>
                        Job Title Match
                    </h2>
                    <p className="text-gray-700 dark:text-gray-200">
                        {results['Job Title Match'] ? (
                            <span className="text-green-600 dark:text-green-400 font-semibold">Matched</span>
                        ) : (
                            <span className="text-red-600 dark:text-red-400 font-semibold">Not Matched</span>
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
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-6 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-tools"></i> {/* Icon for Suggested Skills */}
            </span>
            Suggested Skills
        </h2>
        <ul className="ml-6">
            {results['Suggested Skills'].map((skill, index) => (
                <li
                    key={index}
                    className="flex items-start mb-4 text-gray-700 dark:text-gray-300 transition duration-200 hover:bg-purple-50 dark:hover:bg-purple-900 hover:shadow-sm p-3 rounded-lg"
                >
                    {/* Icon */}
                    <span className="text-purple-600 dark:text-purple-300 text-xl mr-3">
                        <i className="fas fa-check"></i> {/* Icon for skill */}
                    </span>
                    {/* Skill Text */}
                    <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
                        {skill}
                    </p>
                </li>
            ))}
        </ul>
    </div>
)}

{/* Matched Projects And Internships Section */}
{results['Matched Projects And Internships'] && results['Matched Projects And Internships'].length > 0 && (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center dark:text-purple-400">
            <span className="text-purple-600 text-2xl mr-2 dark:text-purple-400">
                <i className="fas fa-project-diagram"></i>
            </span>
            Matched Projects And Internships
        </h2>
        <table className="min-w-full table-auto bg-white border-collapse dark:bg-gray-700">
            <thead>
                <tr className="bg-purple-100 dark:bg-purple-600">
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Project No.</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Project Name</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Description</th>
                </tr>
            </thead>
            <tbody>
                {results['Matched Projects And Internships'].map((project, index) => (
                    <tr key={index} className="border-t border-gray-300 dark:border-gray-600">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{index + 1}</td>
                        <td className="px-4 py-2 text-gray-800 font-semibold dark:text-gray-100">{project.Project}</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{project.Description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

{/* Project Title Description Check Section */}
{results['Project Title Description Check'] && results['Project Title Description Check'].length > 0 && (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center dark:text-purple-400">
            <span className="text-purple-600 text-2xl mr-2 dark:text-purple-400">
                <i className="fas fa-clipboard-list"></i>
            </span>
            Project Title Description Check
        </h2>
        <table className="min-w-full table-auto bg-white border-collapse dark:bg-gray-700">
            <thead>
                <tr className="bg-purple-100 dark:bg-purple-600">
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Project</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Status</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Explanation</th>
                </tr>
            </thead>
            <tbody>
                {results['Project Title Description Check'].map((item, index) => (
                    <tr key={index} className="border-t border-gray-300 dark:border-gray-600">
                        <td className="px-4 py-2 text-gray-800 font-semibold dark:text-gray-100">{item.Project}</td>
                        <td className="px-4 py-2">
                            {item.Status === 'Matched' ? (
                                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full dark:bg-green-800 dark:text-green-200">
                                    &#10003; Matched
                                </span>
                            ) : (
                                <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full dark:bg-red-800 dark:text-red-200">
                                    &#10007; Not Matched
                                </span>
                            )}
                        </td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{item.Explanation}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

{/* Rephrased Projects And Internships Section */}
{results['Rephrased Projects And Internships'] && results['Rephrased Projects And Internships'].length > 0 && (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md ">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 flex items-center dark:text-purple-400">
            <span className="text-purple-600 text-2xl mr-2 dark:text-purple-400">
                <i className="fas fa-retweet"></i>
            </span>
            Rephrased Projects And Internships
        </h2>
        <table className="min-w-full table-auto bg-white border-collapse dark:bg-gray-600">
            <thead>
                <tr className="bg-purple-100 dark:bg-purple-600">
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Project No.</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Original Project</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Rephrased Project(s)</th>
                </tr>
            </thead>
            <tbody>
                {results['Rephrased Projects And Internships'].map((item, index) => (
                    <tr key={index} className="border-t border-gray-300 dark:border-gray-600">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{index + 1}</td>
                        <td className="px-4 py-2 text-gray-800 font-semibold dark:text-gray-100">{item['Original Project']}</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
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
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-6 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-lightbulb"></i> {/* Icon for suggestions */}
            </span>
            Resume Improvement Suggestions
        </h2>
        <ul className="ml-6">
            {results['Resume Improvement Suggestions'].map((suggestion, index) => (
                <li
                    key={index}
                    className="flex items-start mb-4 text-gray-700 dark:text-gray-300 transition duration-200 hover:bg-purple-50 dark:hover:bg-purple-900 hover:shadow-sm p-3 rounded-lg"
                >
                    {/* Icon */}
                    <span className="text-purple-600 dark:text-purple-300 text-xl mr-3">
                        <i className="fas fa-lightbulb"></i> {/* Icon for suggestion */}
                    </span>
                    {/* Suggestion Text */}
                    <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
                        {suggestion}
                    </p>
                </li>
            ))}
        </ul>
    </div>
)}

{/* Grammatical Check Section */}
{results['Grammatical Check'] && (
    <div className="p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-gray-100 dark:bg-gray-700">
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-300 mb-4 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-check-circle"></i> {/* Icon for grammatical check */}
            </span>
            Grammatical Check
        </h2>
        <div className="text-gray-800 dark:text-gray-300">
            {Array.isArray(results['Grammatical Check']) ? (
                <ul className="list-disc list-inside ml-6">
                    {results['Grammatical Check'].map((issue, index) => (
                        <li key={index} className="mb-2">
                            <span className="text-red-600 dark:text-red-400 font-semibold">{issue.error}</span>
                            <span> - {issue.suggestion}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{results['Grammatical Check']}</p>
            )}
        </div>
    </div>
)}

{/* Recruiter Tips Section */}
{results['Recruiter Tips'] && (
    <div className="p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-gray-100 dark:bg-gray-700 mt-5">
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-300 mb-4 flex items-center">
            <span className="text-purple-600 dark:text-purple-300 text-2xl mr-2">
                <i className="fas fa-user-tie"></i> {/* Icon for Recruiter Tips */}
            </span>
            Recruiter Tips
        </h2>

        <div className="mb-6">
            <h3 className="font-semibold dark:text-gray-200">Suggestions:</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {results['Recruiter Tips'].Suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </div>

        <div className="mb-6 font-semibold text-gray-800 dark:text-gray-200">
            <p>Word Count: {results['Recruiter Tips']['Word Count']}</p>
        </div>

        <div className="mb-6">
            <h3 className="font-semibold dark:text-gray-200">Words To Avoid:</h3>
            <table className="min-w-full table-auto bg-white dark:bg-gray-500 border-collapse">
                <thead>
                    <tr className="bg-purple-100 dark:bg-purple-900">
                        <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Word</th>
                        <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Suggested Alternative</th>
                    </tr>
                </thead>
                <tbody>
                    {results['Recruiter Tips'].wordsToAvoid &&
                        Object.entries(results['Recruiter Tips'].wordsToAvoid).map(([word, alternative], index) => (
                            <tr key={index} className="border-t border-gray-300 dark:border-gray-600">
                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{word}</td>
                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{alternative}</td>
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
