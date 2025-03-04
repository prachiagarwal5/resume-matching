import React from 'react';

const Toast = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="toast">
      {message}
      
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          animation: slideIn 0.3s ease-out;
          z-index: 1000;
        }

        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;