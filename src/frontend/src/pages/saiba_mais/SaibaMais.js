import React from 'react';

import logo from '../../img/logo_completa.png';
import login_img from '../../img/login_img.png'
import './SaibaMais.css';

function SaibaMais() {
  return (
    <div className="container">
        <div className="container-login">
            <img alt="" src={logo} className="login-header-img"/>
            <div className="header-login">
                <a className="txt3" href="/contato">Contato</a>
                <a className="txtselect" href="/saiba-mais">Saiba mais</a>
                <a className="txt3" href="/login">Login</a>
            </div>
            <img alt="" src={login_img} className="container-img"/>
            <div className="wrap-saiba">
                <form className="login-form">
                    <span className="login-saiba-title">
                        Sobre o EduTech
                    </span>
                    <div className="wrap-input-saiba">
                        <span className="login-saiba-title2">
                        EduTech é uma plataforma web idealizada com o propósito de apoiar instituições educacionais e aprimorar o progresso acadêmico dos alunos.
                        </span>
                        <span className="login-saiba-title2">
                        Através deste sistema, é possível avaliar o desenvolvimento dos alunos e realizar previsões sobre seu futuro acadêmico
                        </span>
                    </div>
                </form>
            </div>
      </div>
  </div>
  );
}

export default SaibaMais;