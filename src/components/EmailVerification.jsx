import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../FirebaseConfig';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEmailVerified = () => {
      const user = auth.currentUser;
      if (user) {
        user.reload()
          .then(() => {
            if (user.emailVerified) {
              navigate('/sketchboard');
            } else {
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error('Error checking email verification:', error.message);
            setLoading(false);
          });
      }
    };

    const intervalId = setInterval(checkEmailVerified, 2000); // Check every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center">
      {loading ? (
        <h2 className="text-2xl">Checking email verification...</h2>
      ) : (
        <h2 className="text-2xl">Please verify your email before proceeding.</h2>
      )}
    </div>
  );
};

export default EmailVerification;
