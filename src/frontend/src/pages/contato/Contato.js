import React from 'react';

import logo from '../../img/logo_completa.png';
import login_img from '../../img/login_img.png';
import em_andamento from '../../img/em-andamento.png';
import './Contato.css';

function Contato() {
  return (
    <div className="container">
        <div className="container-login">
            <img alt="" src={logo} className="login-header-img"/>
            <div className="header-login">
                <a className="txtselect" href="/contato">Contato</a>
                <a className="txt3" href="/saiba-mais">Saiba mais</a>
                <a className="txt3" href="/login">Login</a>
            </div>
            <img alt="" src={login_img} className="container-img"/>
            <div className="wrap-saiba">
                <form className="login-form">
                    <span className="login-saiba-title">
                        Contatos
                    </span>
                    <div className="wrap-input-saiba">
                    <span className="login-form-title">
                      <img alt="" src={em_andamento} className="img-em-andamento"/>
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