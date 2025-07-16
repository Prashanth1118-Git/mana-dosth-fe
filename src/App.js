import React, { useState } from "react";
import axios from "axios";

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
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h1>🤝 Mana Dosth Chat</h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 10,
          height: "400px",
          overflowY: "auto",
          background: "#f9f9f9",
          marginBottom: 10,
        }}
      >
        {chat.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: 15,
                background: msg.sender === "user" ? "#cce5ff" : "#e2e3e5",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ textAlign: "left", marginBottom: 10 }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: 15,
                background: "#e2e3e5",
              }}
            >
              Dosth typing...
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything in Telugu, Hindi, Tamil..."
          style={{ flex: 1, padding: 10 }}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
        />
        <button onClick={handleAsk} style={{ padding: "10px 20px" }}>
          Ask
        </button>
      </div>
    </div>
  );
}

export default App;
