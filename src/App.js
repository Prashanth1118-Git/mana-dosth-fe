import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question) return;
    try {
      const res = await axios.post("https://mana-dosth-be.onrender.com/ask", {
        query: question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error contacting the model.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🤝 Mana Dosth - Multilingual Q&A</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Meeku em kavali? ఏదైనా అడుగు..."
        style={{ padding: 10, width: "80%" }}
      />
      <button onClick={handleAsk} style={{ marginLeft: 10, padding: 10 }}>
        Ask
      </button>

      {answer && (
        <div style={{ marginTop: 20 }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
