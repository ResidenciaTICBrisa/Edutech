import React from "react";
import "./Header.css";
import logo from "../../img/logo_completa.png";
import LoginButton from '../logged/log';

function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          {/* <button className="button-home" onclick="window.location.href='/'"> */}
          {/* <img src={logo} alt="logo" /> */}
          {/* </button> */}
          <ul>
            <li>
              <a href="/" className="a-logo">
                  <img src={logo} alt="logo" className="img-logo"/>
              </a>
            </li>
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
              <a href="/cadastro/alunos">Cadastro</a>
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
