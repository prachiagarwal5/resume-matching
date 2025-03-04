const Transcript = ({ text, setText, isListening, loading }) => {
    return (
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
    );
  }; 

    export default Transcript;