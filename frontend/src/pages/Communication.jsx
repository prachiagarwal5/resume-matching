import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaMicrophone,
  FaStop,
  FaPaperPlane,
  FaChartBar,
  FaFileAlt,
  FaTools,
} from "react-icons/fa";
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
  const [audioLevel, setAudioLevel] = useState(0);
  const [visualizationType, setVisualizationType] = useState("bars"); // 'bars' or 'circular'

  // Refs for audio visualization
  const audioContext = useRef(null);
  const analyzer = useRef(null);
  const microphone = useRef(null);
  const visualizerRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    initializeSpeechRecognition();
    return () => {
      if (recognition) {
        recognition.stop();
      }
      stopAudioVisualization();
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

  const initializeAudioVisualization = async () => {
    try {
      // Create audio context and analyzer
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyzer.current = audioContext.current.createAnalyser();
      analyzer.current.fftSize = 256;

      // Get microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphone.current = audioContext.current.createMediaStreamSource(stream);
      microphone.current.connect(analyzer.current);

      // Start visualization
      visualizeAudio();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Cannot access microphone for visualization");
    }
  };

  const visualizeAudio = () => {
    if (!analyzer.current || !visualizerRef.current) return;

    const dataArray = new Uint8Array(analyzer.current.frequencyBinCount);
    const canvas = visualizerRef.current;
    const canvasCtx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Function to draw the visualization
    const draw = () => {
      // Request next animation frame
      animationFrameId.current = requestAnimationFrame(draw);

      // Get frequency data
      analyzer.current.getByteFrequencyData(dataArray);

      // Calculate average level for amplitude tracking
      const average =
        dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
      setAudioLevel(average);

      // Clear canvas
      canvasCtx.clearRect(0, 0, width, height);

      if (visualizationType === "bars") {
        drawBarVisualization(canvasCtx, dataArray, width, height);
      } else {
        drawCircularVisualization(canvasCtx, dataArray, width, height);
      }
    };

    // Start drawing
    draw();
  };

  const drawBarVisualization = (canvasCtx, dataArray, width, height) => {
    // Draw background
    canvasCtx.fillStyle = "#262626";
    canvasCtx.fillRect(0, 0, width, height);

    // Number of bars
    const barCount = dataArray.length / 2;

    // Width of each bar with spacing
    const barWidth = (width / barCount) * 0.8;
    const spacing = (width / barCount) * 0.2;

    // Draw bars
    for (let i = 0; i < barCount; i++) {
      const value = dataArray[i];

      // Calculate bar height based on audio data
      let barHeight = (value / 255) * height * 0.8;
      barHeight = Math.max(barHeight, 3); // Minimum bar height

      // Calculate x position with spacing
      const x = i * (barWidth + spacing);

      // Gradient color based on frequency
      const hue = (i / barCount) * 180 + 180; // from purple to purple

      // Brighter when listening, dimmer when not
      const saturation = isListening ? "100%" : "60%";
      const lightness = isListening ? "50%" : "30%";

      // Draw bar
      canvasCtx.fillStyle = `hsl(${hue}, ${saturation}, ${lightness})`;
      canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);

      // Draw reflection (mirrored and faded)
      const gradientReflection = canvasCtx.createLinearGradient(
        0,
        height - barHeight - 1,
        0,
        height - barHeight - barHeight * 0.3,
      );
      gradientReflection.addColorStop(
        0,
        `hsla(${hue}, ${saturation}, ${lightness}, 0.3)`,
      );
      gradientReflection.addColorStop(
        1,
        `hsla(${hue}, ${saturation}, ${lightness}, 0)`,
      );

      canvasCtx.fillStyle = gradientReflection;
      canvasCtx.fillRect(
        x,
        height - barHeight - barHeight * 0.3,
        barWidth,
        barHeight * 0.3,
      );
    }

    // Draw center line
    canvasCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    canvasCtx.lineWidth = 1;
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, height / 2);
    canvasCtx.lineTo(width, height / 2);
    canvasCtx.stroke();
  };

  const drawCircularVisualization = (canvasCtx, dataArray, width, height) => {
    // Set background
    canvasCtx.fillStyle = "#262626";
    canvasCtx.fillRect(0, 0, width, height);

    const center = {
      x: width / 2,
      y: height / 2,
    };

    // Draw center circle
    const baseRadius = Math.min(width, height) * 0.3;

    // Draw outer circles (frequency bins)
    const binCount = dataArray.length / 2;

    // Draw frequency circles
    for (let i = 0; i < binCount; i++) {
      const amplitude = dataArray[i];
      const amplitudePercentage = amplitude / 255;

      // Calculate radius increase based on amplitude
      const radiusIncrease = isListening
        ? amplitudePercentage * 50
        : amplitudePercentage * 20;

      // Calculate angle for this frequency bin
      const angle = (i / binCount) * Math.PI * 2;

      // Calculate point position
      const x = center.x + Math.cos(angle) * (baseRadius + radiusIncrease);
      const y = center.y + Math.sin(angle) * (baseRadius + radiusIncrease);

      // Calculate color based on frequency
      const hue = (i / binCount) * 180 + 180; // purple to purple
      const saturation = isListening ? "80%" : "60%";
      const lightness = 40 + amplitudePercentage * 30 + "%";

      canvasCtx.fillStyle = `hsl(${hue}, ${saturation}, ${lightness})`;

      // Draw point
      canvasCtx.beginPath();
      canvasCtx.arc(x, y, 2 + amplitudePercentage * 3, 0, Math.PI * 2);
      canvasCtx.fill();

      // Draw line from center to this point
      canvasCtx.beginPath();
      canvasCtx.moveTo(center.x, center.y);
      canvasCtx.lineTo(x, y);
      canvasCtx.strokeStyle = `hsla(${hue}, ${saturation}, ${lightness}, 0.4)`;
      canvasCtx.lineWidth = 1 + amplitudePercentage * 2;
      canvasCtx.stroke();
    }

    // Draw central circle
    const gradient = canvasCtx.createRadialGradient(
      center.x,
      center.y,
      0,
      center.x,
      center.y,
      baseRadius,
    );

    // Use the average level to determine center circle color intensity
    const avgLevel = audioLevel / 255;
    const centerHue = isListening ? 210 : 200;
    const centerLightness = isListening ? 40 + avgLevel * 20 : 30;

    gradient.addColorStop(
      0,
      `hsla(${centerHue}, 80%, ${centerLightness}%, 0.8)`,
    );
    gradient.addColorStop(
      0.7,
      `hsla(${centerHue}, 70%, ${centerLightness - 10}%, 0.5)`,
    );
    gradient.addColorStop(
      1,
      `hsla(${centerHue}, 60%, ${centerLightness - 20}%, 0)`,
    );

    canvasCtx.fillStyle = gradient;
    canvasCtx.beginPath();
    canvasCtx.arc(center.x, center.y, baseRadius, 0, Math.PI * 2);
    canvasCtx.fill();

    // Add pulsating effect if listening
    if (isListening) {
      const pulseRadius = baseRadius + 10 + Math.sin(Date.now() / 200) * 5;
      const pulseGradient = canvasCtx.createRadialGradient(
        center.x,
        center.y,
        baseRadius,
        center.x,
        center.y,
        pulseRadius,
      );

      pulseGradient.addColorStop(0, "rgba(0, 150, 255, 0.3)");
      pulseGradient.addColorStop(1, "rgba(0, 150, 255, 0)");

      canvasCtx.fillStyle = pulseGradient;
      canvasCtx.beginPath();
      canvasCtx.arc(center.x, center.y, pulseRadius, 0, Math.PI * 2);
      canvasCtx.fill();
    }
  };

  const stopAudioVisualization = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    if (microphone.current) {
      microphone.current.disconnect();
      microphone.current = null;
    }

    if (audioContext.current && audioContext.current.state !== "closed") {
      audioContext.current.close();
      audioContext.current = null;
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

  const toggleVisualizationType = () => {
    setVisualizationType((prev) => (prev === "bars" ? "circular" : "bars"));
  };

  const startListening = async () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setError(null);
      await initializeAudioVisualization();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      stopAudioVisualization();
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
      setError("Please record some speech first");
      return;
    }

    if (!topic.trim()) {
      setError("Please enter a discussion topic");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5001/api/communication/comm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            topic,
          }),
        },
      );

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
    const sentences = text.split(". ").filter((s) => s.trim().length > 0);

    if (sentences.length <= 2) {
      return text; // If it's short, return as is
    }

    return (
      <div className="formatted-paragraph">
        {sentences.map((sentence, index) => (
          <p key={index} className="paragraph-sentence">
            {sentence.trim() + (sentence.endsWith(".") ? "" : ".")}
          </p>
        ))}
      </div>
    );
  };

  // Format discussion structure into an outline
  const formatStructure = (text) => {
    if (!text) return "";

    // Replace roman numerals and section headers with proper formatting
    const sections = text
      .split(/\s*(?:I{1,3}V?|V)\.\s+/)
      .filter((s) => s.trim().length > 0);

    if (sections.length <= 1) {
      return formatParagraph(text); // If not properly sectioned, use paragraph formatting
    }

    return (
      <div className="structured-outline">
        {text
          .split(/\s*(?:I{1,3}V?|V)\.\s+/)
          .filter((s) => s.trim().length > 0)
          .map((section, index) => {
            const [title, ...content] = section.split(":");
            if (!title) return null;

            return (
              <div key={index} className="outline-section">
                <h5 className="section-title">{`${index + 1}. ${title.trim()}`}</h5>
                <p className="section-content">{content.join(":").trim()}</p>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div className="w-screen bg-gray-900 text-white">
      <nav className="bg-white dark:bg-gray-900 bg-opacity-80 text-purple-900 dark:text-purple-300 w-full p-4 shadow-lg flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">
          GLA Resume Fit
        </div>
        <div className="flex items-center space-x-4">
          {/* Add the Create Resume button */}
          <Link
            to="/mul_resume"
            className="flex items-center space-x-2 bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
          >
            <FaTools />
            <span>ATS Analyzer</span>
          </Link>
          <Link
            to="/resume"
            className="flex items-center space-x-2 bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
          >
            <FaFileAlt />
            <span>Create Resume</span>
          </Link>
          <Link
            to="/communication"
            className="flex items-center space-x-2 bg-purple-700 dark:bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 dark:hover:bg-purple-500 transition duration-300"
          >
            <FaMicrophone />
            <span>Communication</span>
          </Link>
        </div>
      </nav>
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">
            Group Discussion Analysis
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Analyze your communication skills through speech recognition
          </p>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter discussion topic..."
                disabled={loading}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold ${
                  isListening
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                disabled={loading}
              >
                {isListening ? (
                  <>
                    <FaStop /> <span>Stop</span>
                  </>
                ) : (
                  <>
                    <FaMicrophone /> <span>Start</span>
                  </>
                )}
              </button>

              <Timer isRunning={isListening} />

              <button
                onClick={toggleVisualizationType}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                disabled={loading}
                title="Change visualization"
              >
                {visualizationType === "bars" ? "⚪" : "▮"}
              </button>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetAll}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                disabled={loading || (!text && !analysis)}
              >
                <MdRefresh /> <span>Reset</span>
              </button>

              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                disabled={!text}
              >
                <MdContentCopy /> <span>Copy</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Discussion Transcript</h3>
              <div className="text-gray-400">
                Words: {text.trim().split(/\s+/).filter(Boolean).length}
              </div>
            </div>

            <div className="relative w-full h-64 bg-gray-700 rounded-lg overflow-hidden">
              <canvas
                ref={visualizerRef}
                width="800"
                height="250"
                className="w-full h-full"
              />

              {!isListening && text && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
                  <div className="text-center text-white">{text}</div>
                </div>
              )}

              {!isListening && !text && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                  <FaMicrophone size={40} className="text-gray-500 mb-4" />
                  <p className="text-gray-400">
                    Click "Start" to begin recording your discussion
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={analyzeText}
            className="mt-8 w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            disabled={loading || !text.trim()}
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <FaChartBar /> <span>Analyze Discussion</span>
              </>
            )}
          </button>

          {analysis && (
            <div className="mt-8 bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-6">
                Analysis Results
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Structured Notes */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Structured Notes
                  </h4>
                  <div>{formatParagraph(analysis.structuredNotes)}</div>
                </div>

                {/* Discussion Structure */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Recommended Structure
                  </h4>
                  <div>{formatStructure(analysis.brainstormedStructure)}</div>
                </div>

                {/* Improvement Suggestions */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Improvement Suggestions
                  </h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {Array.isArray(analysis.improvementSuggestions) ? (
                      analysis.improvementSuggestions.map(
                        (suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ),
                      )
                    ) : (
                      <p>{analysis.improvementSuggestions}</p>
                    )}
                  </ul>
                </div>

                {/* Expected Responses */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Expected Responses
                  </h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {analysis.expectedResponses.map((response, index) => (
                      <li key={index}>{response}</li>
                    ))}
                  </ul>
                </div>

                {/* Key Insights */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Key Insights
                  </h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {analysis.keyInsights &&
                      analysis.keyInsights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                  </ul>
                </div>

                {/* Common Pitfalls */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Common Pitfalls
                  </h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {analysis.commonPitfalls &&
                      analysis.commonPitfalls.map((pitfall, index) => (
                        <li key={index}>{pitfall}</li>
                      ))}
                  </ul>
                </div>

                {/* Persuasive Techniques */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Persuasive Techniques
                  </h4>
                  <div>{formatParagraph(analysis.persuasiveTechniques)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Toast show={showToast} message={toastMessage} />
      </div>
    </div>
  );
};

export default Communication;
