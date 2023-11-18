import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { RiContactsLine } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '../Firebase';
import './Profile.scss';
import SignUp from '../SignUp/SignUp';

const Profile = ({ name }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authInstance = getAuth();

    // Use onAuthStateChanged to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        // User is authenticated
        setIsLoggedIn(true);
      } else {
        // User is not authenticated, redirect to the login page
        navigate('/login');
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const authInstance = getAuth();

    try {
      await signOut(authInstance);
      console.log('User signed out successfully');
      // Redirect to the sign-in page after successful sign-out
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // If the user is not logged in, show the SignUp component
  if (!isLoggedIn) {
    return <SignUp />;
  }

  // If the user is logged in, show the profile page
  return (
    <div style={{padding: '200px'}}>
      <h1 style={{ textAlign: 'center' }}>Welcome {name}</h1>
      <div className="profile">
        <div className="user-info">
          <FaUserCircle />
          <p>{name}</p>
        </div>
        <div className="advance">
          <div className="detail" style={{ color: 'white', fontSize: '25px' }}>
            <RiContactsLine /> Account
            <IoIosArrowForward />
            <p style={{ fontSize: '12px', color: 'gray' }}>Edit Username</p>
            <p style={{ fontSize: '12px', color: 'gray' }}>Edit Password</p>
          </div>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
