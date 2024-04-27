import React from 'react';
import { Outlet, Link } from 'react-router-dom';





const RootLayout = () => {
  return (
    <div>
        <nav>
          <ul>
          <li>
          <Link to="/signup">Sign Up</Link>
           </li>
           <li>
             <Link to="/signin">Sign In</Link>
           </li>
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