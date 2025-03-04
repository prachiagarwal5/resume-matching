const TopicInput = ({ topic, setTopic, loading }) => {
    return (
      <div className="topic-input">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter discussion topic..."
          disabled={loading}
        />
      </div>
    );
  };

  export default TopicInput;