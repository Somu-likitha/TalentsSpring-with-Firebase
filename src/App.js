import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import User from './components/User';
import Author from './components/Author';
import { auth, firestore } from './firebase';

const App = () => {
  const [user1, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setIsLoading(false);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const PrivateRoute = ({ component: Component, role }) => {
    return userRole === role ? <Component /> : <Navigate to="/signin" replace />;
  };

  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/user',
      element: <PrivateRoute component={User} role="user" />,
    },
    {
      path: '/author',
      element: <PrivateRoute component={Author} role="author" />,
    },
    {
      path: '*',
      element: <Navigate to="/signin" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;