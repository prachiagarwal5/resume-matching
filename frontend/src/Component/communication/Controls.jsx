const Controls = ({ 
    isListening, 
    startListening, 
    stopListening, 
    resetAll, 
    copyToClipboard, 
    loading, 
    text, 
    analysis 
  }) => {
    return (
      <div className="main-controls">
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
    );
  };

  export default Controls;