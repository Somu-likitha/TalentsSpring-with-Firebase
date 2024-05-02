// import React from 'react';

// import './styles.css';

// const Home = () => {
//   return (
//     <div>
//       <h1>Home</h1>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import './styles.css';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        const { role } = userDoc.data();
        setUserRole(role);
      } else {
        setUserRole(null);
      }

      setIsLoading(false);
    };

    checkUserRole();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (userRole === 'author') {
        navigate('/author', { replace: true });
      } else if (userRole === 'user') {
        navigate('/user', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    }
  }, [isLoading, userRole, navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Home;