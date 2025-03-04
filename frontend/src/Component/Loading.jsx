import React from 'react';

const Loading = () => (
  <div className="loading">
    <div className="spinner"></div>
    
    <style jsx>{`
      .loading {
        display: inline-flex;
        align-items: center;
      }
      
      .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid #ffffff;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default Loading;