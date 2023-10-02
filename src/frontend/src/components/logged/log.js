import React, { useState } from 'react';
import "./log.css";

function LoginButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleButtonClick = () => {
    setLoggedIn(!loggedIn); // Inverte o estado de loggedIn
  };

  return (
    <button className="log-pos log-color" onClick={handleButtonClick}>
      {loggedIn ? 'Sing out' : 'Sing In'}
    </button>
  );
}

export default LoginButton;
