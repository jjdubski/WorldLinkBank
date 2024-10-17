import React from 'react'
import "./welcome.css"

const Welcome = () => {
  return (
    <div className='welcome-cont'>
        <div className='text-align-welcome'>
        <h1>Welcome to World Link Bank</h1>
        <h3>At WorldLink, we specialize in providing comprehensive FX trading solutions that empower investors to navigate the complexities of the global currency markets. Our expert team combines cutting-edge technology, deep market insights, and a client-focused approach to deliver consistent results for traders of all levels.</h3>
        <button className="welcome-button">Dashboard</button>
        </div>
    </div>
  )
}

export default Welcome