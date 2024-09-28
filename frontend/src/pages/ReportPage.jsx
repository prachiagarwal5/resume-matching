import React, { useEffect, useState } from 'react';
import Report from '../Component/Report';
import axios from 'axios';

const ReportPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/analyze', {
          resumeText: "Sample resume text", // Replace with actual resumeText
          jobDescription: "Sample job description" // Replace with actual jobDescription
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Report data={data} />
    </div>
  );
};

export default ReportPage;
