import React from 'react';
import { useState } from "react";

import logo from '../../img/logo_completa.png';
import login_img from '../../img/login_img.png';
import em_andamento from '../../img/em-andamento.png';
import './Contato.css';

function Contato() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
        <div className="container-login">
            <img src={logo} className="login-header-img"/>
            <div className="header-login">
                <a className="txtselect" href="/contato">Contato</a>
                <a className="txt3" href="/saiba-mais">Saiba mais</a>
                <a className="txt3" href="/login">Login</a>
            </div>
            <img src={login_img} className="container-img"/>
            <div className="wrap-saiba">
                <form className="login-form">
                    <span className="login-saiba-title">
                        Contatos
                    </span>
                    <div className="wrap-input-saiba">
                    <span className="login-form-title">
                      <img src={em_andamento} className="img-em-andamento"/>
                    </span>
                    <span className="login-form-title">
                      Em construção
                    </span>
                    </div>
                </form>
            </div>
      </div>
  </div>
  );
}

export default Contato;