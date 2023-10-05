import icon_home from '../../img/home_icon.png';
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="div-fundo-home">
        <div className="div-fundo-content-home">
          <div className="child-home">
            <p className="text-home">Bem-vindo(a) ao Edutech!</p>
            <h1 className="p-home">
              Navegue pelas opções acima para acessar todas as ferramentas
              disponíveis.
            </h1>
            <h1 className="p-home">
              <a className="a-home" href="/saiba-mais">
                Saiba Mais
              </a>
              : Tem dúvidas sobre como utilizar nosso site? Clique abaixo para
              encontrar orientações detalhadas.
            </h1>
            <h1 className="p-home">
              <a className="a-home" href="/contato">
                Entre em Contato
              </a>
              : Caso surja alguma dúvida durante sua navegação, utilize os meios
              de contato indicados.
            </h1>
          </div>
          <div className="child-home-img">
            <div className="img-home-content">
              <img className="img-home" src={icon_home} alt="Home" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
