import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import { FaHome, FaRunning, FaBookReader } from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";
import { RiBookMarkedFill, RiLogoutBoxRFill } from "react-icons/ri";
import { MdMore } from "react-icons/md";
import Court from "../Assets/Court.jpg";
import Gym from "../Assets/Gym.jpg";
import Player from "../Assets/Player.jpeg";
import Trainer from "../Assets/Trainer.jpeg";

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user's name from localStorage
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <div className='cont'>
      <header className="head">
        <ul className="navb">
          <li className="nav-item"><i><FaHome /></i><a href="/home" className="nav-link">Home</a></li>
          <li className="nav-item"><i><FaRunning /></i><a href="/play" className="nav-link">Play</a></li>
          <li className="nav-item"><i><FaBookReader /></i><a href="/learn" className="nav-link">Learn</a></li>
          <li className="nav-item"><i><SiGooglemeet /></i><a href="/meet" className="nav-link">Meet</a></li>
          <li className="nav-item"><i><RiBookMarkedFill /></i><a href="/book" className="nav-link">Book</a></li>
          <li className="nav-item"><i><MdMore /></i><a href="/more" className="nav-link">More</a></li>
          <li className="nav-item"><i><RiLogoutBoxRFill /></i><a href="/" className="nav-link" onClick={() => localStorage.removeItem('userName')} >Logout</a></li>
         
 
        </ul>
      </header>

      <div className="dashboard">
        <h1 className='hula'>Welcome {userName} ❤️ let's get things rolling!</h1>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <img src={Court} alt="Court" />
            <button onClick={() => navigate('/Court')}>Book Court</button>
          </div>
          <div className="dashboard-card">
            <img src={Gym} alt="Gym" />
            <button onClick={() => navigate('/BookGym')}>Book Gym</button>
          </div>
          <div className="dashboard-card">
            <img src={Trainer} alt="Trainer" />
            <button onClick={() => navigate('/trainer')}>Book Trainer</button>
          </div>
          <div className="dashboard-card">
            <img src={Player} alt="Player" />
            <button onClick={() => navigate('/PlayerDetails')}>Find Player</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
