import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';
import SignInImage from './images/SignInImage.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const userDoc = await firestore.collection('users').doc(user.uid).get();
      const { role } = userDoc.data();
      await user.updateProfile({ role });
      console.log('User signed in successfully!');
      if (role === 'author') {
        navigate('/author');
      } else {
        navigate('/profession');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="left-side">
      <div className='image-container'>
        <img src={SignInImage} alt="Sign Up"  />

        </div>
      </div>
      <div className="right-side">
        <div>
          <h2>Sign In</h2>
          <form onSubmit={handleSignIn} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            </div>
            <button type="submit" className="auth-btn">
              Sign In
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;