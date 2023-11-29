import icon_home from '../../../img/home_icon.png';
import React from 'react';
import Header from "../../../components/header/Header";
import './HomeSaibaMais.css';

const HomeSaibaMais = () => {
  return (
      <>
      <Header />

    <div className="div-fundo-home-saibamais">
        <div className="div-fundo-content-home-saibamais">
            <div className="child-home-saibamais">
                <div>
                    <p class="text-home-saibamais">Saiba Mais</p>
                    <h1 class="p-home-saibamais">
                    EduTech é uma plataforma web idealizada com o propósito de apoiar instituições educacionais e aprimorar o progresso acadêmico dos alunos.
                    </h1>
                    <h1 class="p-home-saibamais">
                    Através deste sistema, é possível avaliar o desenvolvimento dos alunos e realizar previsões sobre seu futuro acadêmico
                    </h1>
                    <h1 class="p-home">
                        <a className="a-home-voltar" href="/">Voltar</a>
                    </h1>
              </div>
            </div>
            <div className="child-home-saibamais-img">
                  <div class="img-home-saibamais-content">
                      <img class="img-home-saibamais" src={icon_home} alt="Home"/>
                  </div>
            </div>
        </div>
    </div>
      </>
  );
};
export default HomeSaibaMais;
