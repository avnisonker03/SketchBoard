import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import background from '../assets/images/background.jpg';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();
  const [emptyField, setEmptyField] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      setEmptyField(true);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
        navigate('/sketchboard');
        setError(false);
      })
      .catch((error) => {
        console.error('Error signing in:', error.message);
        setError(true);
      });
  };

  const handlePasswordReset = () => {
    if (!email) {
      setEmptyField(true);
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetEmailSent(true);
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
        {error && <p className="text-center text-lg text-red-500 mb-2">Invalid Email or Password!</p>}
        {emptyField && <p className="text-center text-lg text-red-500 mb-2">Please fill in the required fields first!</p>}
        {resetEmailSent && <p className="text-center text-lg text-green-500 mb-2">Password reset email sent!</p>}
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
