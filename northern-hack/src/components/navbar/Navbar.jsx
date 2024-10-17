import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar-cont'>
        <div className="navbar-left">
            <div className="left-menu">
                <Link to="/">
                <img src="./images/logo.png" alt="" className="logo-image" />
                </Link>
                    <p className="title">World Link Bank</p>
            </div>
        </div>
        <div className="navbar-right">
            <div className="menu-cont-navbar">
                <Link to='/portfolio'><p className="menu-item">Portfolio</p></Link>
                <Link to='/rates'><p className="menu-item">Rates</p></Link>
                <Link to='/trade'><p className="menu-item">Trade</p></Link>
                <button className="menu-item-button">Dashboard</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar