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

  return (
    <div className="group-discussion-container w-screen">
      <div className="content-wrapper">
        <h1>Group Discussion Analysis</h1>
        <p className="description">
          Analyze your communication skills through speech recognition
        </p>


        <div className="main-controls">
        {/* Add Topic Input */}
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
            <div className="analysis-grid">
              <div className="analysis-item">
                <h4>STRUCTURED NOTES</h4>
                <p>{analysis.structuredNotes}</p>
              </div>
              <div className="analysis-item">
                <h4>EXPECTED RESPONSES</h4>
                <ul>
                  {analysis.expectedResponses.map((response, index) => (
                    <li key={index}>{response}</li>
                  ))}
                </ul>
              </div>
              <div className="analysis-item">
                <h4>DISCUSSION STRUCTURE</h4>
                <p>{analysis.brainstormedStructure}</p>
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
        }

        .content-wrapper {
          max-width: 800px;
          margin: 0 auto;
          background: #2d2d2d;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
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
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .control-group {
          display: flex;
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

        .error-message {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px solid rgba(220, 53, 69, 0.3);
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

          .main-controls {
            flex-direction: column;
          }

          .control-group {
            justify-content: center;
          }
        }
           .topic-input {
          margin-bottom: 2rem;
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
          border-color: #666666;
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .analysis-item ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          color: #b3b3b3;
        }

        .analysis-item li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Communication;