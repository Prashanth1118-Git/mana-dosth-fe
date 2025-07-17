import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Custom styling in separate file

function App() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setChat((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("https://mana-dosth-be.onrender.com/ask", {
        query: userMessage.text,
      });

      const botMessage = { sender: "bot", text: res.data.answer };
      setChat((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: "bot",
        text: "❌ Error contacting backend.",
      };
      setChat((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🤝 Mana Dosth Chat</h1>

      <div className="chat-wrapper">
        <div className="alphabet-strip left-strip">
          <AlphabetTile letter="అ" label="Charminar" />
          <AlphabetTile letter="அ" label="Tanjore Temple" />
          <AlphabetTile letter="ಅ" label="Mysore Palace" />
          <AlphabetTile letter="അ" label="Trivandrum Temple" />
        </div>

        <div className="chat-box">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.sender === "user" ? "right" : "left"}`}
            >
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-message left">
              <div className="chat-bubble">Dosth typing...</div>
            </div>
          )}
        </div>

        <div className="alphabet-strip right-strip">
          <AlphabetTile letter="ఆ" label="Warangal Fort" />
          <AlphabetTile letter="ஆ" label="Madurai Meenakshi" />
          <AlphabetTile letter="ಆ" label="Hampi" />
          <AlphabetTile letter="ആ" label="Backwaters" />
        </div>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything in Telugu, Hindi, Tamil..."
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
        />
        <button onClick={handleAsk}>Ask</button>
      </div>
    </div>
  );
}

function AlphabetTile({ letter, label }) {
  return (
    <div className="alphabet-tile" title={label}>
      <span className="letter">{letter}</span>
      <span className="label">🏛️</span>
    </div>
  );
}

export default App;
