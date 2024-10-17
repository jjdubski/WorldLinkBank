import React from 'react'
import "./navbar.css"

const Navbar = () => {
  return (
    <div className='navbar-cont'>
        <div className="navbar-left">

        </div>
        <div className="navbar-right">
            <div className="menu-cont">
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