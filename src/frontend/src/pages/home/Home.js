import icon_home from '../../img/home_icon.png';
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="dark-background">
      <div className="div-fundo-content-home">
        <div className="child-home">
          <p className="text-home">Bem-vindo(a) ao Edutech!</p>
        </div>
        <div className="child-home-img">
          <div className="img-home-content">
            <img className="img-home" src={icon_home} alt="Home" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
