import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import UserFavicon from './UserFavicon';
import AuthorFavicon from './AuthorFavicon';
import './style1header.css'

function Header() {
    const [user1, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async(user) => {
        setUser(user);
        setIsLoggedIn(!!user);
  
        if (user1) {
          const userDoc = await firestore.collection('users').doc(user1.uid).get();
          const { role } = userDoc.data();
          setUserRole(role);
        } else {
          setUserRole(null);
        }
  
      });
  
      return unsubscribe;
    }, [user1]);
  return (
    <div>
              <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          {isLoggedIn && (
            <li style={{ float: 'right' }}>
              {userRole === 'author' ? <AuthorFavicon /> : <UserFavicon />}
            </li>
            )}

        </ul>
      </nav>
    </div>
  )
}

export default Header