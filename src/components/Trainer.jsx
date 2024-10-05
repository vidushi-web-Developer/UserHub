import React, { useEffect, useState } from "react";
import axios from "axios";
import './Trainer.css';
import { useNavigate } from 'react-router-dom';

function Trainer() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectionTimeouts, setSelectionTimeouts] = useState({});

  useEffect(() => {
    
    axios.get("http://localhost:3001/trainers")
      .then(response => {
        setTrainers(response.data);
        setBackendAvailable(true);
      })
      .catch(error => {
        console.error("Backend not available", error);
        setBackendAvailable(false);
      });
  }, []);

  const handleSelectTrainer = (trainer) => {
    setSelectedTrainer(trainer._id); 

    const timeout = setTimeout(() => {
      setSelectedTrainer(null);  
    }, 12000);

    setSelectionTimeouts((prev) => ({ ...prev, [trainer._id]: timeout }));

    const userEmail = "kaushikaina@gmail.com";
    const userName = "Aina";  
  
    
    axios.post("http://localhost:3001/send-email", {
      trainerName: trainer.trainerName,
      userEmail: userEmail,
      userName: userName,
    })
    .then(response => {
      console.log("Email sent successfully:", response.data.message);
    })
    .catch(error => {
      console.warn("Email could not be sent but continuing...");
    });
  };

  
  useEffect(() => {
    return () => {
      Object.values(selectionTimeouts).forEach(clearTimeout);
    };
  }, [selectionTimeouts]);

  return (
    <div className="container-3">
      <button className="btn-D2" onClick={() => navigate('/Dashboard')}>
        Go to Dashboard
      </button>
      <h2 className="head2">Trainer</h2>
      {backendAvailable && (
        <div className="tile-container">
          {trainers.map((trainer) => (
            <div key={trainer._id} className="tile">
              <h3>{trainer.trainerName}</h3>
              <img className="img1" src={trainer.imgSrc} alt={trainer.trainerName} />
              <p><strong>Speciality:</strong> {trainer.speciality}</p>
              <p><strong>Time Availability:</strong> {trainer.availability}</p>
              <p><strong>Location:</strong> {trainer.location}</p>
              <p><strong>Remuneration:</strong> {trainer.remuneration}</p>
              
              {selectedTrainer === trainer._id ? (
                <h4 className="selected-messagess">
                  {trainer.trainerName} is selected!
                </h4>
              ) : (
                <button className="b7" onClick={() => handleSelectTrainer(trainer)}>
                  Select
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trainer;

