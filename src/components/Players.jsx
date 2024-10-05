import React, { useState } from "react";
import ChatBox from './ChatBox'; // Adjust the import path according to your folder structure
import "./Players.css";

const Players = ({ name, age, gender, sports, distance, image }) => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false); // State to track if the player is selected

  const toggleChatBox = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleSelect = () => {
    setIsSelected(true); // Mark the player as selected when the button is clicked

    // Set a timer to remove the selection message after 2 minutes (120000 milliseconds)
    setTimeout(() => {
      setIsSelected(false);
    }, 6000); 
  };

  return (
    <div className="box">
      <h3>{name}</h3>
      <img src={image} alt={name} className="box-image" />
      <div className="box-content">
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Sports: {sports}</p>
        <p>Distance: {distance}</p>
        <div className="box-buttons">
          <button className="btn-chat" onClick={toggleChatBox}>Chat</button>
          <button className="btn-slct" onClick={handleSelect}>Select</button>
        </div>
        {/* Display the selected message below the buttons */}
        {isSelected && <p className="selected-message">{name} is selected</p>}
      </div>
      {/* Pass the player's name to the ChatBox */}
      <ChatBox isVisible={isChatVisible} onClose={() => setIsChatVisible(false)} playerName={name} />
    </div>
  );
};

export default Players;
