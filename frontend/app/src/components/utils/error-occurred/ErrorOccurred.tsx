// ErrorOccurred.jsx
import './style.css';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorOccurred = () => {
  return (
    <div className="error-occurred-container">
      <FaExclamationTriangle className="error-occurred-icon" />
      <h2>An Error Occurred</h2>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
};

export default ErrorOccurred;
