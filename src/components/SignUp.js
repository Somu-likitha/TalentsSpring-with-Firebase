import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import './styles/styles.css';
import signUpImage from './images/signUpImage.png';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('user');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ role });
      await firestore.collection('users').doc(user.uid).set({
        email: user.email,
        role,
        username,
        gender,
        dob,
        phoneNumber,
      });
      console.log('User signed up successfully!');
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="left-side">
        <div className="image-container">
        <img src={signUpImage} alt="Sign Up"  />

        </div>
      </div>
      <div className="right-side">
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp} className="auth-form">
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="auth-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="auth-input"
              >
                <option value="user">User</option>
                <option value="author">Author</option>
              </select>
            </div>
            <button type="submit" className="auth-btn">
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;