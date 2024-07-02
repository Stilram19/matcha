import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function VerifyEmail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
        
        if (!token) {
        setMessage('Invalid or missing token.');
        setIsLoading(false);
        return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/emailVerification`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token }),
            });

            const msg = await response.json();

            if (response.ok) {
                setMessage('Email verified successfully.');
            } else {
                console.log('Error Message' + msg);
                setMessage('Failed to verify email.');
            }
        } catch (error) {
        console.error('Error verifying email:', error);
        setMessage('An error occurred while verifying the email.');
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
