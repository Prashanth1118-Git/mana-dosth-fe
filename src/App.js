import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
  axios.get("https://mana-dosth-be.onrender.com/friends")
    .then((response) => {
      setFriends(response.data);
    });
}, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>🤝 Mana Dosth</h1>
      <h3>Welcome! మీరు ఎలా ఉన్నారు? नमस्ते! வணக்கம்!</h3>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend.name} - {friend.language}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
