const AnalysisResults = ({ analysis }) => {
    return (
      <div className="analysis-section">
        <h3>Analysis Results</h3>
        <div className="analysis-grid">
          <AnalysisCard
            title="STRUCTURED NOTES"
            content={analysis.structuredNotes}
            icon={<FaFileAlt />}
          />
          <AnalysisCard
            title="EXPECTED RESPONSES"
            content={
              <ul>
                {analysis.expectedResponses.map((response, index) => (
                  <li key={index}>{response}</li>
                ))}
              </ul>
            }
            icon={<FaListUl />}
          />
          <AnalysisCard
            title="DISCUSSION STRUCTURE"
            content={analysis.brainstormedStructure}
            icon={<FaSitemap />}
          />
        </div>
      </div>
    );
  };

    export default AnalysisResults;