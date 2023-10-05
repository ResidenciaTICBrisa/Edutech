import React, { useState } from 'react';
import './log.css';

function LoginButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleButtonClick = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <button className="log-pos log-color" onClick={handleButtonClick}>
      {loggedIn ? 'Sign out' : 'Sign In'}
    </button>
  );
}

export default LoginButton;
