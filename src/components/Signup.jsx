import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import background from '../assets/images/background.jpg';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [error,setError]=useState(false);
  const [emptyField,setEmptyField]=useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if(!email||!password){
      setEmptyField(true);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            alert('Verification email sent! Please check your email.');
            navigate('/verify-email'); 
          })
          .catch((error) => {
            console.error('Error sending verification email:', error.message);
            setError(true);
          });
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
        setError(true);
      });
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="flex items-center justify-center w-full px-4 sm:px-0">
        <div className="flex flex-col items-center bg-peach rounded-lg shadow-lg p-8 border mb-16 sm:mb-80 w-full sm:w-auto">
          {showSignIn ? (
            <SignIn />
          ) : (
            <>
              <h2 className="text-2xl mb-4">Sign Up with Email and Password</h2>
              {error && <p className="text-center text-lg text-red-500 mb-2">Invalid Email or Password! Error in signup</p>}
              {emptyField && <p className="text-center text-lg text-red-500 mb-2">Please fill in the required fields first!</p>}
              <div className="flex flex-col space-y-4 w-full">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-300 rounded px-3 py-2 mb-3 w-full"
                />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-300 rounded px-3 py-2 mb-3 w-full"
                />
                <button onClick={handleSignUp} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 w-full">
                  Sign Up
                </button>
                <div className="text-sm mt-2">
                  Already have an account?{' '}
                  <button className="text-blue-500 underline" onClick={handleSignInClick}>
                    <Link to='/signin'>
                      Click to Sign-in
                    </Link>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

