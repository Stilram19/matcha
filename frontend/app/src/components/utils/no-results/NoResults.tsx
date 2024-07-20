// NoResult.jsx
import './style.css'
import { FaSearch } from 'react-icons/fa';

const NoResult = () => {
  return (
    <div className="no-result-container">
      <FaSearch className="no-result-icon" />
      <h2>No Results Found</h2>
      <p>Try adjusting your search or filter to find what you're looking for.</p>
    </div>
  );
};

export default NoResult;
