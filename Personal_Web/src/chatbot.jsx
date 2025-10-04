import { useState } from "react";
import "./css/chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handlePredict = async () => {
    if (!input.trim()) return; // remove empty string

    // Show user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    // Send to Flask
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }), // Flask expects 'message'
    });

    const data = await res.json();

    setMessages([...newMessages, { text: data, sender: "bot" }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">ChatBot 💬</div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePredict()}
        />
        <button onClick={handlePredict}>Send</button>
      </div>
    </div>
  );
}
