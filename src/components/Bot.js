import React, { useState } from "react";
import './chatbot.css';
import data from './botdata';

const Bot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", user: false }
  ]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessages = [
      ...messages,
      { text: input, user: true },
      { text: getBotResponse(input), user: false }
    ];

    setMessages(newMessages);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getBotResponse = (input) => {
    const normalizedInput = input.toLowerCase();
    for (const key in data) {
      if (normalizedInput.includes(key)) {
        return data[key];
      }
    }
    return "I'm sorry, I didn't understand that.";
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleCancel = () => {
    window.location.href = "/"; // Redirects to homepage
  };

  return (
    <div className="chatbot-container">
      {!chatOpen && (
        <div className="chatbot-icon" onClick={toggleChat}>
          🗨️
        </div>
      )}

      {chatOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">  
            <span className="chatbot-title">PetBot</span>
            <button onClick={toggleChat} className="close-btn">X</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.user ? "user-msg" : "bot-msg"}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bot;
