import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState({
    id: 0,
    content: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/add_message",
        message
      );
      console.log(response.data); // Mensagem de sucesso do back-end
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <div className="App">
      <h1>Add Message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content:</label>
          <input
            type="text"
            name="content"
            value={message.content}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Message</button>
      </form>
    </div>
  );
}

export default App;
