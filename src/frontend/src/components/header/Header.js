import React from "react";
import "./Header.css";
import logo from "../../img/logo.png";

function Header() {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo" />
        <h1>Edutech</h1>
        <nav>
          <ul>
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
      </div>
    </header>
  );
}

export default Header;
