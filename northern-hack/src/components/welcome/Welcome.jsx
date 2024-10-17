import React from 'react'
import "./welcome.css"
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='welcome-cont'>
        <div className='text-align-welcome'>
          <h1>Welcome to World Link Bank</h1>
          <h3>At WorldLink, we specialize in providing comprehensive FX trading solutions that empower 
            investors to navigate the complexities of the global currency markets. Our expert team 
            combines cutting-edge technology, deep market insights, and a client-focused approach to deliver consistent results for traders of all levels.</h3>
          <Link to="/trade"><button className="welcome-button">Start Trading FX</button></Link>
      
        </div>
    </div>
  )
}

export default Welcome