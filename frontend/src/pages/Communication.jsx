import React, { useState, useEffect } from "react";

const Communication = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Initialize speech recognition
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        console.log("Speech recognition started");
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setText(transcript);
        console.log("Transcript:", transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
      console.error("Speech recognition not supported");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = async () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);

      // Send the text to your backend
      if (text) {
        try {
          const response = await fetch("/api/communication/comm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
          });

          const data = await response.json();
          console.log("Analysis result:", data);
        } catch (error) {
          console.error("Error sending text to server:", error);
        }
      }
    }
  };

  return (
    <div className="speech-recognition">
      <div className="controls">
        <button
          onClick={isListening ? stopListening : startListening}
          className={isListening ? "recording" : ""}
        >
          {isListening ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      <div className="transcript">
        <h3>Transcript:</h3>
        <p>{text}</p>
      </div>

      <style jsx>{`
        .speech-recognition {
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
        }

        .controls {
          margin-bottom: 20px;
          text-align: center;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          background-color: #007bff;
          color: white;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #0056b3;
        }

        button.recording {
          background-color: #dc3545;
        }

        .transcript {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 5px;
          min-height: 100px;
        }
      `}</style>
    </div>
  );
};

export default Communication;
