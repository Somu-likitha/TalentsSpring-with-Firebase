// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, firestore } from '../firebase';
import './styles/Home.css';
import ArtImage from './images/ArtImage.jpg';
import BankingImage from './images/BankingImage.webp';
import GovernmentImage from './images/GovernmentImage.webp';
import HardwareImage from './images/HardwareImage.jpeg.jpg';
import SoftwareImage from './images/SoftwareImage.jpg';


const Home = () => {
  // const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  // const [userRole, setUserRole] = useState(null);

  // useEffect(() => {
  //   const checkUserRole = async () => {
  //     const user = auth.currentUser;

  //     if (user) {
  //       const userDoc = await firestore.collection('users').doc(user.uid).get();
  //       const { role } = userDoc.data();
  //       setUserRole(role);
  //     } else {
  //       setUserRole(null);
  //     }

  //     setIsLoading(false);
  //   };

  //   checkUserRole();
  // }, []);

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (userRole === 'author') {
  //       navigate('/author', { replace: true });
  //     } else if (userRole === 'user') {
  //       navigate('/user', { replace: true });
  //     } else {
  //       navigate('/home', { replace: true });
  //     }
  //   }
  //   else {
  //     navigate('/home', { replace: true });
  //   }
  // }, [isLoading, userRole, navigate]);

  return (
    <div>
      <div className="home">
      <h1 className="glowing-text">Home</h1>
      <p className="home-text large-text">Publish Your passions, your way</p>
      <p className="home-text small-text">Create a unique and beautiful blog</p>
      <div className="image-slider">
        <div className="image-card">
          <img src={ArtImage} alt="ArtImage" />
          <div className="image-overlay">
            <p>Content for Image 1</p>
          </div>
        </div>
        <div className="image-card">
          <img src={SoftwareImage} alt="SoftwareImage" />
          <div className="image-overlay">
            <p>Content for Image 2</p>
          </div>
        </div>
        <div className="image-card">
          <img src={BankingImage} alt="BankingImage" />
          <div className="image-overlay">
            <p>Content for Image 3</p>
          </div>
        </div>
        <div className="image-card">
          <img src={GovernmentImage} alt="GovernmentImage" />
          <div className="image-overlay">
            <p>Content for Image 4</p>
          </div>
        </div>
        <div className="image-card">
          <img src={HardwareImage} alt="HardwareImage" />
          <div className="image-overlay">
            <p>Content for Image 5</p>
          </div>
        </div>
        
      </div>
    </div>

    </div>
  );
};

export default Home;