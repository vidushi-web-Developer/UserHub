import React, { useState } from "react";
import Players from "./Players"; // Make sure to import the updated Players component
import "./PlayerDetails.css";
import { useNavigate } from 'react-router-dom';

const PlayerDetails = () => {
  const navigate = useNavigate();

  // Number of boxes to display per page
  const boxesPerPage = 10;

  // State for current page
  const [currentPage, setCurrentPage] = useState(0);

  const boxes = [
    // Your list of player objects
    {
      name: "Virat Kohli",
      age: 35,
      gender: "Male",
      sports: "Cricket",
      distance: "9 miles",
      image: "./images/ViratKohli.jpg"
    },
    {
      name: "Rohit Sharma",
      age: 37,
      gender: "Male",
      sports: "Cricket",
      distance: "7 miles",
      image: "../images/Rohit.jpg",
    },
    {
      name: "Jasprit",
      age: 30,
      gender: "Male",
      sports: "Cricket",
      distance: "2 miles",
      image: "images/Jasprit.jpeg",
    },
    {
      name: "PV Sindhu",
      age: 29,
      gender: "Female",
      sports: "Badminton",
      distance: "25 miles",
      image: "images/Sindhu.jpeg",
    },
    {
      name: "Yuvraj Singh",
      age: 42,
      gender: "Male",
      sports: "Cricket",
      distance: "12 miles",
      image: "images/Yuvraj Singh.jpeg",
    },
    {
      name: "Yibbi-Jansen",
      age: 24,
      gender: "Female",
      sports: "Hockey",
      distance: "5 miles",
      image: "images/Yibbi-Jansen.jpeg",
    },
    {
      name: "Cristiano Ronaldo",
      age: 39,
      gender: "Male",
      sports: "Football",
      distance: "2 miles",
      image: "images/Ronaldo.jpeg",
    },
    {
      name: "MS Dhoni",
      age: 43,
      gender: "Male",
      sports: "Cricket",
      distance: "5 miles",
      image: "images/Mahi.jpeg",
    },
    {
      name: "Hardik Pandya",
      age: 30,
      gender: "Male",
      sports: "Cricket",
      distance: "2 miles",
      image: "images/Hardik-pandya.jpeg",
    },
    {
      name: "Smriti Mandhana",
      age: 26,
      gender: "Female",
      sports: "Cricket",
      distance: "5 miles",
      image: "images/Mandhana.jpeg",
    },
    {
      name: "Harleen Deol",
      age: 26,
      gender: "Female",
      sports: "Cricket",
      distance: "22 miles",
      image: "./images/Harleen Deon.jpeg"
    },
    {
      name: "Lebron James",
      age: 39,
      gender: "Male",
      sports: "Basketball",
      distance: "35 miles",
      image: "../images/Lebron James.jpeg",
    },
    {
      name: "Salima Tete",
      age: 22,
      gender: "Female",
      sports: "Hockey",
      distance: "21 miles",
      image: "images/Salima Tete.jpeg",
    },
    {
      name: "Sania Mirza",
      age: 37,
      gender: "Female",
      sports: "Tennis",
      distance: "52 miles",
      image: "images/Sania Mirza.jpeg",
    },
    {
      name: "Sunil chhetri",
      age: 40,
      gender: "Male",
      sports: "Football",
      distance: "23 miles",
      image: "images/sunil chhetri.jpeg",
    },
    {
      name: "MANU BHAKER",
      age: 22,
      gender: "Female",
      sports: "Cricket",
      distance: "15 miles",
      image: "images/MANU BHAKER.jpeg",
    },
    {
      name: "Kim Yeon-Koung",
      age: 36,
      gender: "Female",
      sports: "Volleyball",
      distance: "12 miles",
      image: "images/Kim Yeon-Koung.jpeg",
    },
    {
      name: "Rahul",
      age: 32,
      gender: "Male",
      sports: "Cricket",
      distance: "5 miles",
      image: "images/Rahul.jpeg",
    },
    {
      name: "Mithali Raj",
      age: 41,
      gender: "Female",
      sports: "Cricket",
      distance: "20 miles",
      image: "images/Mithali Raj.jpeg",
    },
    {
      name: "Sachin",
      age: 51,
      gender: "Male",
      sports: "Cricket",
      distance: "50 miles",
      image: "images/Sachin Tendulkar.jpeg",
    },
  ];

  // Calculate the total number of pages
  const totalPages = Math.ceil(boxes.length / boxesPerPage);

  // Calculate the index range for the current page
  const startIndex = currentPage * boxesPerPage;
  const endIndex = startIndex + boxesPerPage;

  // Get the boxes for the current page
  const currentBoxes = boxes.slice(startIndex, endIndex);


  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="app">
      <button className="btn-D" onClick={() => navigate('/Dashboard')}>Go to Dashboard</button>
      <h2 className="apph1">Rising Players</h2>
      <div className="box-container">
        {currentBoxes.map((box, index) => (
          <Players
            key={index}
            name={box.name}
            age={box.age}
            gender={box.gender}
            sports={box.sports}
            distance={box.distance}
            image={box.image}
          
          />
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={goToPreviousPage} disabled={currentPage === 0}>
          Previous
        </button>

        <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PlayerDetails;

