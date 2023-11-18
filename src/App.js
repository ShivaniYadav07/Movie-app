import React, { useEffect, useState } from 'react';
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
// import Header from './Components/Header/Header';
import LowerHead from './Components/LowerHeader/LowerHead';
import Explore from './Components/Explore/Explore';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login.jsx'
import SignUp from './Components/SignUp/SignUp.jsx';
import { auth } from "./Components/Firebase.js";

const App = () => {


  const [userName, setUserName] = useState("");
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile name={userName}  />} />
      </Routes>
      <LowerHead />
    </Router>
  );
};

export default App;
