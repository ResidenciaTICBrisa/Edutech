import icon_home from '../../../img/em_const.png';
import React from 'react';
import Header from "../../../components/header/Header";
import './HomeContato.css';

const HomeContato = () => {
  return (
    <>
    <Header />

    <div class="img-home-contato-content">
        <img class="img-home-contato" src={icon_home} alt="Home"/>
        <h1 className='contato'>Em construção</h1>
    </div>
    </>
  );
};
export default HomeContato;
