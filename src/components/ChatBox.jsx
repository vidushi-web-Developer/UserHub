import React, { useState, useEffect } from 'react';
import './ChatBox.css';


function ChatBox({ isVisible, onClose, playerName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (isVisible) {
     
      setInputMessage('');
      setMessages([]);
    }
  }, [isVisible]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { id: Date.now(), text: inputMessage };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      setTimeout(() => {
        setMessages((currentMessages) =>
          currentMessages.filter((message) => message.id !== newMessage.id)
        );
      }, 60000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`chat-box-container ${isVisible ? 'open' : ''}`}>
      <div className="chat-box-header">
       
        <span>Chat with {playerName}</span>
        <button onClick={onClose} className="close-button">
          X
        </button>
      </div>
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="input"
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
