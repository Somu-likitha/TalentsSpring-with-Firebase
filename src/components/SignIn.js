import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { user } = await auth.signInWithEmailAndPassword(email, password);
  //     const userDoc = await firestore.collection('users').doc(user.uid).get();
  //     const { role } = userDoc.data();
  //     await user.updateProfile({ role });
  //     console.log('User signed in successfully!');
  //     if (role === 'author') {
  //       navigate('/author');
  //     } else {
  //       navigate('/user');
  //     }
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //   }
  // };
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
        navigate('/profession'); // Navigate to the Profession component
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-btn">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;