import React from 'react'
import "../../App.scss"
import "./Header.scss"
import logo from "../../assets/img/Mask group.png"

const Header = () => {
  return (
    <>
    <nav className='header'>
      <img src={logo} alt="img" />

      <ul className='nav-head'>
        <li><a href="/">Popular</a></li>
        <li><a href="/">Upcoming</a></li>
        <li><a href="/">Classics</a></li>
        <li><a href="/">Top 10</a></li>
      </ul>
    </nav> 
   
    </>

    )
}

export default Header
