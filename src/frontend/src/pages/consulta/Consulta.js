import React from "react";

import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Consulta.css";

function Consulta() {
  return (
    <>
      <Header />
      <div className="dark-background button-container">
        <Link to="/consulta/aluno">
          <button className="styled-button">Consulta de Aluno</button>
        </Link>

        <Link to="/consulta/instituicao">
          <button className="styled-button">Consulta de Instituição</button>
        </Link>

        <Link to="/consulta/unidade">
          <button className="styled-button">Consulta de Unidade</button>
        </Link>
      </div>
    </>
  );
}

export default Consulta;
