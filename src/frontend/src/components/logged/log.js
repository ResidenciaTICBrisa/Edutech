import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './log.css';

function LoginButton() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleButtonClick = () => {
    setLoggedIn(!loggedIn);
    navigate('/login');
  };

  return (
    <button className="log-pos log-color" onClick={handleButtonClick}>
      {loggedIn ? 'Sign out' : 'Sign In'}
    </button>
  );
}

export default LoginButton;
