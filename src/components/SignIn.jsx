import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import background from '../assets/images/background.jpg';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // Unified state for messages
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000); // 3000 milliseconds = 3 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount or re-render
    }
  }, [message]);

  const handleSignIn = () => {
    if (!email || !password) {
      setMessage({ type: 'emptyField', text: 'Please fill in the required fields first!' });
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
        navigate('/sketchboard');
        setMessage(null); // Clear any existing message
      })
      .catch((error) => {
        console.error('Error signing in:', error.message);
        setMessage({ type: 'error', text: 'Invalid Email or Password!' });
      });
  };

  const handlePasswordReset = () => {
    if (!email) {
      setMessage({ type: 'emptyField', text: 'Please fill in the required fields first!' });
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage({ type: 'resetEmailSent', text: 'Password reset email sent!' });
        console.log('Password reset email sent!');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="bg-peach p-8 border shadow-lg rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-16 sm:mb-80">
        <h2 className="text-2xl mb-4 text-center">Sign In with Email and Password</h2>
        {message && message.type === 'error' && (
          <p className="text-center text-lg text-red-500 mb-2">{message.text}</p>
        )}
        {message && message.type === 'emptyField' && (
          <p className="text-center text-lg text-red-500 mb-2">{message.text}</p>
        )}
        {message && message.type === 'resetEmailSent' && (
          <p className="text-center text-lg text-green-500 mb-2">{message.text}</p>
        )}
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 rounded px-3 py-2 mb-3 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 rounded px-3 py-2 mb-2 w-full"
            required
          />
          <button onClick={handlePasswordReset} className="text-blue-500 underline text-sm mb-4">
            Forgot or Reset your password?
          </button>
          <button onClick={handleSignIn} className="px-4 py-2 bg-blue-500 text-lg text-white rounded hover:bg-blue-800 transition duration-200 w-full">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
