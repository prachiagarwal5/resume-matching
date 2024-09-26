import React, { useState } from 'react';
import axios from 'axios';
import ResultsDisplay from './ResultsDisplay';

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
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Upload Resume:</label>
                    <input type="file" onChange={handleFileChange} accept=".pdf" />
                </div>
                <div>
                    <label>Job Description:</label>
                    <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                </div>
                <button type="submit">Analyze</button>
            </form>

            {results && <ResultsDisplay results={results} />}
        </div>
    );
};

export default ResumeUpload;
