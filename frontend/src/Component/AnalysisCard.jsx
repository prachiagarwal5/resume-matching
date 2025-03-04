const AnalysisCard = ({ analysis }) => {
  return (
    <div className="analysis-section">
      <h3>Discussion Analysis</h3>
      <div className="analysis-content">
        <div className="analysis-block">
          <h4>Structured Notes</h4>
          <div className="content-box">
            {analysis.structuredNotes}
          </div>
        </div>

        <div className="analysis-block">
          <h4>Expected Responses</h4>
          <div className="content-box">
            <ul>
              {analysis.expectedResponses.map((response, index) => (
                <li key={index}>{response}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="analysis-block">
          <h4>Discussion Structure</h4>
          <div className="content-box">
            {analysis.brainstormedStructure}
          </div>
        </div>
      </div>

      <style jsx>{`
        .analysis-section {
          margin-top: 2rem;
          padding: 2rem;
          background: #2d2d2d;
          border-radius: 12px;
        }

        .analysis-content {
          display: grid;
          gap: 2rem;
        }

        .analysis-block {
          background: #3d3d3d;
          padding: 1.5rem;
          border-radius: 8px;
        }

        h4 {
          color: #ffffff;
          margin-bottom: 1rem;
          font-size: 1.2rem;
          border-bottom: 1px solid #4a4a4a;
          padding-bottom: 0.5rem;
        }

        .content-box {
          color: #b3b3b3;
          line-height: 1.6;
        }

        ul {
          list-style-type: disc;
          margin-left: 1.5rem;
        }

        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default AnalysisCard;