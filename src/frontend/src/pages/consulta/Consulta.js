import React from "react";

import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Consulta.css";

function Consulta() {
  return (
    <>
      <Header />
      <div className="dark-background button-container">
        <Link to="aluno">
          <button className="styled-button">Consulta de Aluno</button>
        </Link>

        <Link to="instituicao">
          <button className="styled-button">Consulta de Instituição</button>
        </Link>

        <Link to="unidade">
          <button className="styled-button">Consulta de Unidade</button>
        </Link>

        <Link to="disciplina">
          <button className="styled-button">Consulta de Disciplina</button>
        </Link>

        <Link to="turma">
          <button className="styled-button">Consulta de Turma</button>
        </Link>

        <Link to="professor">
          <button className="styled-button">Consulta de Professor</button>
        </Link>

        <Link to="avaliacao">
          <button className="styled-button">Consulta de Avaliação</button>
        </Link>
      </div>
    </>
  );
}

export default Consulta;
