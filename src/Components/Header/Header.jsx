import React from 'react'
import "../../App.scss"
import "./Header.scss"
import logo from "../../assets/img/Mask group.png"
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Header = () => {
  const scrollToRow = (rowId) => {
    scroll.scrollTo(rowId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };
  return (
    <>
    <nav className='header'>
      <img src={logo} alt="img" />

      <ul className='nav-head'>
      <li>
            <ScrollLink to="row1" smooth={true} duration={800} onClick={() => scrollToRow('row1')}>
              Popular
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="row2" smooth={true} duration={800} onClick={() => scrollToRow('row2')}>
              Upcoming
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="row3" smooth={true} duration={800} onClick={() => scrollToRow('row3')}>
              Classics
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="row4" smooth={true} duration={800} onClick={() => scrollToRow('row4')}>
              Top 10
            </ScrollLink>
          </li>
      </ul>
    </nav> 
   
    </>

    )
}

export default Header
