import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import logo from '../../img/logo_completa.png';
import login_img from '../../img/login_img.png'
import './Login.css';
import PessoaService from '../../services/PessoaService';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      senha: password,
    };

    PessoaService.login(loginData).then((response) => {
      if (response) {
        console.log("Login realizado com sucesso!", response.escola);
        navigate("/");
      } else {
        window.window.alert("Erro ao realizar login!");
      }
    });
  };

  return (
    <div className="container">
      <div className="container-login">
      <img src={logo} className="login-header-img" alt='logo'/>
      <div className="header-login">
          <a className="txt3" href="/contato">Contato</a>
          <a className="txt3" href="/saiba-mais">Saiba mais</a>
          <a className="txtselect" href="/login">Login</a>
      </div>
      <img src={login_img} className="container-img" alt='img-login'/>
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title">
              <img src={logo} className="img-login" alt='logo-login'/>
            </span>
            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button type="submit" className="login-form-btn" onClick={handleLogin}>Login</button>
            </div>

            <div className="text-center">
              
              <span className="txt1">Esqueceu a senha? </span>
              <a className="txt2" href="/contato">
                Suporte
              </a>
            </div>
          </form>
        </div>
      </div>
  </div>
);
}

export default Login;