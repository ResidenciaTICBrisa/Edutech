import React from "react";
import "./Header.css";
import logo from "../../img/logo_completa.png";
import LoginButton from '../logged/log';

function Header() {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo" />
        <nav>
          <ul>
          <li className="nav-item">
              {/* <a href="/predicao">Predição</a> */}
            </li>
            <li className="nav-item">
              <a href="/predicao">Predição</a>
            </li>
            <li className="nav-item">
              <a href="/consulta">Consulta</a>
            </li>
            <li className="nav-item">
              <a href="/graficos">Gráficos</a>
            </li>
            <li className="nav-item">
              <a href="/cadastro">Cadastro</a>
            </li>
            <li className="nav-item">
              <a href="/feedback">Feedback</a>
            </li>
          </ul>

        </nav>
        <LoginButton />
      </div>
    </header>
  );
}

export default Header;
