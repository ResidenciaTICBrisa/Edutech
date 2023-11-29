import React from 'react';
import './Header.css';
import logo from '../../img/logo_completa.png';
import LoginButton from '../logged/log';

function HeaderComponent() {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <a href="/" className="a-logo">
                <img src={logo} alt="logo" className="img-logo" />
              </a>
            </li>
            <li className="nav-item">
              <a href="/cadastro">Cadastro</a>
            </li>
            <li className="nav-item">
              <a href="/consulta">Consulta</a>
            </li>
            <li className="nav-item">
              <a href="/predicao">Predição</a>
            </li>
          </ul>
        </nav>
        <LoginButton />
      </div>
    </header>
  );
}

export default HeaderComponent;
