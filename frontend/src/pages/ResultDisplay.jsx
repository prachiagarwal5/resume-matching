import React from 'react';

const ResultsDisplay = ({ results }) => {
    return (
        <div>
            <h3>Analysis Results</h3>
            <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
    );
};

export default ResultsDisplay;
