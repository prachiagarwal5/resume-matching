import React, { useState, useEffect } from "react";
import { FaMicrophone, FaStop, FaPaperPlane, FaChartBar } from "react-icons/fa";
import { MdRefresh, MdContentCopy } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import Loading from "../Component/Loading";
import AnalysisCard from "../Component/AnalysisCard";
import Timer from "../Component/Timer";
import Toast from "../Component/Toast";


const Communication = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    initializeSpeechRecognition();
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const initializeSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setError(null);
        showToastMessage("Speech recognition started");
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setText(transcript);
      };

      recognition.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        showToastMessage("Speech recognition error");
      };

      recognition.onend = () => {
        setIsListening(false);
        showToastMessage("Speech recognition ended");
      };

      setRecognition(recognition);
    } else {
      setError("Speech recognition not supported in your browser");
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    showToastMessage("Text copied to clipboard");
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setError(null);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const resetAll = () => {
    setText("");
    setAnalysis(null);
    setError(null);
    showToastMessage("Reset successful");
  };

  const analyzeText = async () => {
    if (!text.trim()) {
      setError("Please record or enter some text first");
      return;
    }

    if (!topic.trim()) {
      setError("Please enter a discussion topic");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5001/api/communication/comm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          text,
          topic 
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message);
      }

      setAnalysis(data.data.analysis);
      showToastMessage("Analysis completed successfully");
    } catch (error) {
      setError(error.message || "Error analyzing text");
      showToastMessage("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  // Format paragraph text with proper line breaks
  const formatParagraph = (text) => {
    if (!text) return "";
    
    // Split by sentences and create bullet points for better readability
    const sentences = text.split('. ').filter(s => s.trim().length > 0);
    
    if (sentences.length <= 2) {
      return text; // If it's short, return as is
    }
    
    return (
      <div className="formatted-paragraph">
        {sentences.map((sentence, index) => (
          <p key={index} className="paragraph-sentence">
            {sentence.trim() + (sentence.endsWith('.') ? '' : '.')}
          </p>
        ))}
      </div>
    );
  };

  // Format discussion structure into an outline
  const formatStructure = (text) => {
    if (!text) return "";
    
    // Replace roman numerals and section headers with proper formatting
    const sections = text.split(/\s*(?:I{1,3}V?|V)\.\s+/).filter(s => s.trim().length > 0);
    
    if (sections.length <= 1) {
      return formatParagraph(text); // If not properly sectioned, use paragraph formatting
    }
    
    return (
      <div className="structured-outline">
        {text.split(/\s*(?:I{1,3}V?|V)\.\s+/).filter(s => s.trim().length > 0).map((section, index) => {
          const [title, ...content] = section.split(':');
          if (!title) return null;
          
          return (
            <div key={index} className="outline-section">
              <h5 className="section-title">{`${index + 1}. ${title.trim()}`}</h5>
              <p className="section-content">{content.join(':').trim()}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="group-discussion-container w-screen">
      <div className="content-wrapper">
        <h1>Group Discussion Analysis</h1>
        <p className="description">
          Analyze your communication skills through speech recognition
        </p>

        <div className="main-controls">
          <div className="topic-input">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter discussion topic..."
              disabled={loading}
            />
          </div>
          <div className="control-group">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`control-btn ${isListening ? "recording" : ""}`}
              disabled={loading}
            >
              {isListening ? (
                <>
                  <FaStop /> Stop
                </>
              ) : (
                <>
                  <FaMicrophone /> Start
                </>
              )}
            </button>
            
            <Timer isRunning={isListening} />
          </div>

          <div className="control-group">
            <button
              onClick={resetAll}
              className="control-btn reset"
              disabled={loading || (!text && !analysis)}
            >
              <MdRefresh /> Reset
            </button>
            
            <button
              onClick={copyToClipboard}
              className="control-btn copy"
              disabled={!text}
            >
              <MdContentCopy /> Copy
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="transcript-section">
          <div className="section-header">
            <h3>Discussion Transcript</h3>
            <div className="word-count">
              Words: {text.trim().split(/\s+/).filter(Boolean).length}
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start speaking or type here..."
            disabled={isListening || loading}
          />
        </div>

        <button
          onClick={analyzeText}
          className="analyze-btn"
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <FaChartBar /> Analyze Discussion
            </>
          )}
        </button>

        {analysis && (
          <div className="analysis-section">
            <h3>Analysis Results</h3>
            
            <div className="analysis-tabs">
              <div className="tabs-container">
                <div className="tab active">Your Analysis</div>
              </div>
            </div>
            
            <div className="analysis-grid">
              {/* Structured Notes */}
              <div className="analysis-card primary-card">
                <div className="card-header">
                  <h4>STRUCTURED NOTES</h4>
                  <div className="card-icon">📝</div>
                </div>
                <div className="card-content">
                  {formatParagraph(analysis.structuredNotes)}
                </div>
              </div>
              
              {/* Discussion Structure */}
              <div className="analysis-card primary-card">
                <div className="card-header">
                  <h4>RECOMMENDED STRUCTURE</h4>
                  <div className="card-icon">🏗️</div>
                </div>
                <div className="card-content">
                  {formatStructure(analysis.brainstormedStructure)}
                </div>
              </div>
              
              {/* Improvement Suggestions */}
              <div className="analysis-card">
                <div className="card-header">
                  <h4>IMPROVEMENT SUGGESTIONS</h4>
                  <div className="card-icon">⬆️</div>
                </div>
                <div className="card-content">
                  {Array.isArray(analysis.improvementSuggestions) ? (
                    <ul className="bullet-list">
                      {analysis.improvementSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{analysis.improvementSuggestions}</p>
                  )}
                </div>
              </div>
              
              {/* Expected Responses */}
              <div className="analysis-card">
                <div className="card-header">
                  <h4>EXPECTED RESPONSES</h4>
                  <div className="card-icon">💬</div>
                </div>
                <div className="card-content">
                  <ul className="bullet-list">
                    {analysis.expectedResponses.map((response, index) => (
                      <li key={index}>{response}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Key Insights */}
              <div className="analysis-card">
                <div className="card-header">
                  <h4>KEY INSIGHTS</h4>
                  <div className="card-icon">💡</div>
                </div>
                <div className="card-content">
                  <ul className="bullet-list highlight">
                    {analysis.keyInsights && analysis.keyInsights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Common Pitfalls */}
              <div className="analysis-card">
                <div className="card-header">
                  <h4>COMMON PITFALLS</h4>
                  <div className="card-icon">⚠️</div>
                </div>
                <div className="card-content">
                  <ul className="bullet-list warning">
                    {analysis.commonPitfalls && analysis.commonPitfalls.map((pitfall, index) => (
                      <li key={index}>{pitfall}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Persuasive Techniques */}
              <div className="analysis-card">
                <div className="card-header">
                  <h4>PERSUASIVE TECHNIQUES</h4>
                  <div className="card-icon">🎯</div>
                </div>
                <div className="card-content">
                  {formatParagraph(analysis.persuasiveTechniques)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Toast show={showToast} message={toastMessage} />

      <style jsx>{`
        .group-discussion-container {
          min-height: 100vh;
          background: #1a1a1a;
          padding: 2rem;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
        }

        .content-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          background: #2d2d2d;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        h1 {
          color: #ffffff;
          text-align: center;
          margin-bottom: 1rem;
          font-size: 2.5rem;
        }

        .description {
          text-align: center;
          color: #b3b3b3;
          margin-bottom: 2rem;
        }

        .main-controls {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .control-group {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          background: #3d3d3d;
          color: #ffffff;
        }

        .control-btn:hover:not(:disabled) {
          background: #4a4a4a;
        }

        .control-btn.recording {
          background: #dc3545;
          animation: pulse 2s infinite;
        }

        .control-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .transcript-section {
          margin-bottom: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .word-count {
          color: #b3b3b3;
          font-size: 0.9rem;
        }

        textarea {
          width: 100%;
          min-height: 200px;
          padding: 1rem;
          border: 1px solid #4a4a4a;
          border-radius: 8px;
          resize: vertical;
          font-family: inherit;
          background: #3d3d3d;
          color: #ffffff;
        }

        textarea:focus {
          outline: none;
          border-color: #666666;
        }

        .analyze-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .analyze-btn:hover:not(:disabled) {
          background: #0056b3;
        }

        .analyze-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-message {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px solid rgba(220, 53, 69, 0.3);
        }

        .topic-input {
          margin-bottom: 1rem;
          width: 100%;
        }

        .topic-input input {
          width: 100%;
          padding: 1rem;
          border: 1px solid #4a4a4a;
          border-radius: 8px;
          background: #3d3d3d;
          color: #ffffff;
          font-size: 1rem;
        }

        .topic-input input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        /* Analysis Section Styling */
        .analysis-section {
          margin-top: 3rem;
          background: #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
        }

        .analysis-section h3 {
          color: #ffffff;
          text-align: center;
          font-size: 1.8rem;
          padding: 1.5rem 0;
          background: linear-gradient(90deg, #007bff, #0056b3);
          margin: 0;
        }

        .analysis-tabs {
          background: #333333;
          padding: 0 1rem;
        }

        .tabs-container {
          display: flex;
          overflow-x: auto;
        }

        .tab {
          padding: 1rem 2rem;
          border-bottom: 3px solid transparent;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .tab.active {
          border-bottom-color: #007bff;
          color: #007bff;
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          padding: 1.5rem;
        }

        .analysis-card {
          background: #333333;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .analysis-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }

        .primary-card {
          grid-column: span 2;
        }

        .card-header {
          background: #3a3a3a;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #444444;
        }

        .card-header h4 {
          color: #007bff;
          margin: 0;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .card-icon {
          font-size: 1.5rem;
        }

        .card-content {
          padding: 1.5rem;
          flex: 1;
        }

        .bullet-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .bullet-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          line-height: 1.6;
          color: #bbbbbb;
        }

        .bullet-list li:before {
          content: "•";
          color: #007bff;
          font-weight: bold;
          font-size: 1.2rem;
          position: absolute;
          left: 0;
          top: -2px;
        }

        .bullet-list.highlight li:before {
          color: #00cc66;
        }

        .bullet-list.warning li:before {
          color: #ffaa00;
        }

        .formatted-paragraph p {
          margin-bottom: 0.8rem;
          line-height: 1.6;
          color: #bbbbbb;
        }

        .structured-outline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .outline-section {
          margin-bottom: 0.5rem;
        }

        .section-title {
          color: #00aaff;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .section-content {
          color: #bbbbbb;
          line-height: 1.6;
          margin: 0;
          padding-left: 1rem;
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .group-discussion-container {
            padding: 1rem;
          }

          .content-wrapper {
            padding: 1.5rem;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
          }

          .primary-card {
            grid-column: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Communication;