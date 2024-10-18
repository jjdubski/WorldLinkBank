import React from 'react'
import "./welcome.css"
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='welcome-cont'>
        <div className="left">
            <div className="welcome-subtitle">FOREX EXCHANGE</div>
            <div className="welcome-title">WORLD LINK BANK</div>
            <div className="welcome-intro">At WorldLink, we provide comprehensive FX trading solutions that empower investors to navigate the complexities of the global currency markets. 
            </div>
            <Link to="/dashboard">
                <div className="welcome-button">Dashboard</div>
            </Link>
        </div>
        <div className="right">
            <img src="./images/i.jpg" alt="" className="bg-main" />
        </div>
    </div>
  )
}

export default Welcome