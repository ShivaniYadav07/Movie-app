import React from 'react';
import { Link } from 'react-router-dom';
import '../../Components/LowerHeader/LowerHeader.scss';
import { IoIosHome } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const LowerHead = () => {
  return (
    <>
     <nav className='lower'>
  <ul className='lower-head'>
    <li><Link to="/"><IoIosHome />Home</Link></li>
    <li><Link to="/explore"><MdOutlineExplore />Explore</Link></li>
    <li><Link to="/profile"><CgProfile />Profile</Link></li>
  </ul>
</nav>


    </>
  );
};

export default LowerHead;
