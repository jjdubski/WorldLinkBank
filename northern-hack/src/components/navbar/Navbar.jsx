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
                    <p className="title">WorldLink</p>
            </div>
        </div>
        <div className="navbar-right">
            <div className="menu-cont-navbar">
                <p className="menu-item">Transactions</p>
                <p className="menu-item">Account</p>
                <p className="menu-item">Rates</p>
                <button className="menu-item-button">Dashboard</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar