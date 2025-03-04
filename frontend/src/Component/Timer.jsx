import React, { useState, useEffect } from 'react';
import { BiTime } from 'react-icons/bi';

const Timer = ({ isRunning }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <BiTime />
      <span>{formatTime(time)}</span>
      
      <style jsx>{`
        .timer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: #3d3d3d;
          border-radius: 8px;
          color: #ffffff;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Timer;