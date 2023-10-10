import React, { useState } from 'react';
import './log.css';

function LoginButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleButtonClick = () => {
    setLoggedIn(!loggedIn);
    window.location.href = '/login';
  };

  return (
    <button className="log-pos log-color" onClick={handleButtonClick}>
      {'Sign out'}
      {/* {loggedIn ? 'Sign out' : 'Sign In'} */}
    </button>
  );
}

export default LoginButton;
