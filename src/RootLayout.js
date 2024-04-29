import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { auth } from './firebase';
import UserFavicon from './components/UserFavicon';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

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
          {isLoggedIn && <UserFavicon />}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; Footer of My Website</p>
      </footer>
    </div>
  );
};

export default RootLayout;