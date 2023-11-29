import icon_home from '../../img/home_icon.png';
import React from 'react';
import Header from "../../components/header/Header";
import './Home.css';

const Home = () => {
  return (
      <>
      <Header />

    <div className="div-fundo-home">
        <div className="div-fundo-content-home">
            <div className="child-home">
                <div>
                    <p class="text-home">Bem-vindo(a) ao Edutech!</p>
                    <h1 class="p-home">
                        Navegue pelas opções acima para acessar todas as ferramentas disponíveis.
                    </h1>
                    <h1 class="p-home">
                        <a className="a-home" href="/saibamais">Saiba Mais</a>: Tem dúvidas sobre como utilizar nosso site? Clique abaixo para encontrar orientações detalhadas.
                    </h1>
                    <h1 class="p-home">
                        <a className="a-home" href="/contatohome">Entre em Contato</a>: Caso surja alguma dúvida durante sua navegação, utilize os meios de contato indicados.
                    </h1>
              </div>
            </div>
            <div className="child-home-img">
                  <div class="img-home-content">
                      <img class="img-home" src={icon_home} alt="Home"/>
                  </div>
            </div>
        </div>
    </div>
      </>
  );
};
export default Home;

