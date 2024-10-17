import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios";
import './App.css'

function App() {
  const [test, setText] = useState("")
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchHello = async () => {
        axios.get(`${backendURL}/hello`).then(response => {
          setText(response.data.message)
        })
        .catch(error => {
          console.error(error)
        })
    };
    fetchHello();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{test}</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
