import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendActionRequest } from '../../utils/httpRequests';

function VerifyEmail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const verifyEmail = async () => {
      
      if (!token) {
        setMessage('Invalid or missing token.');
        setIsLoading(false);
        return;
      }

      try {
        await sendActionRequest('POST', import.meta.env.VITE_LOCAL_VERIFY_EMAIL_API_URL as string, { token }, token);

        setTimeout(() => {
          navigate('/complete-info/1');
        }, 1000);
        setMessage('Email verified successfully.');
      } catch (error) {
        setTimeout(() => {
          navigate('/login');
        }, 1000);
        setMessage('Failed to verify email.');
      } finally {
        setIsLoading(false);
      }
  };

  verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="ml-4">Verifying Email...</p>
        </div>
      ) : (
        <h2>{message}</h2>
      )}
    </div>
  );
}

export default VerifyEmail;
