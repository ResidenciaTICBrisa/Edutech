import React from "react";

import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Consulta.css";
import aluno from "../../img/aluno.png";
import disciplina from "../../img/disciplina.png";
import turma from "../../img/turma.png";
import unidade from "../../img/unidade.png";
import instituicao from "../../img/instituicao.png";

function Consulta() {
  return (
    <>
      <Header />
      <div className="div-fundo-consulta">
        <p className="text-consulta-consulta">O que deseja consultar?</p>
        <div className="div-fundo-content">
          <div className="child-consulta-1">
            <div className="img-consulta-consulta-content">
              <img className="img-consulta-consulta" src={aluno} alt="Aluno" />
            </div>
            <Link to="aluno">
              <div className="content-consulta">
                <button className="button-consulta-consulta">
                  Consultar Aluno
                </button>
              </div>
            </Link>
          </div>

          <div className="child-consulta">
            <div className="img-consulta-consulta-content">
              <img
                className="img-consulta-consulta"
                src={aluno}
                alt="Consultar Unidade"
              />
            </div>
            <Link to="professor">
              <div className="content-consulta">
                <button className="button-consulta-consulta">
                  Consultar Professor
                </button>
              </div>
            </Link>
          </div>

          <div className="child-consulta-1">
            <div className="img-consulta-consulta-content">
              <img
                className="img-consulta-consulta"
                src={instituicao}
                alt="Consultar Instituição"
              />
            </div>
            <Link to="instituicao">
              <div className="content-consulta">
                <button className="button-consulta-consulta">
                  Consultar Instituição
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="div-fundo-content">
          <div className="child-consulta">
            <div className="img-consulta-consulta-content">
              <img
                className="img-consulta-consulta"
                src={unidade}
                alt="Consultar Unidade"
              />
            </div>
            <Link to="unidade">
              <div className="content-consulta">
                <button className="button-consulta-consulta">
                  Consultar Unidade
                </button>
              </div>
            </Link>
          </div>

          <div className="child-consulta">
            <div className="img-consulta-consulta-content">
              <img
                className="img-consulta-consulta"
                src={disciplina}
                alt="Consultar Disciplina"
              />
            </div>
            <Link to="disciplina">
              <div className="content-consulta">
                <button className="button-consulta-consulta">
                  Consultar Disciplina
                </button>
              </div>
            </Link>
          </div>

          <div className="child-consulta">
            <div className="img-consulta-consulta-content">
              <img
                className="img-consulta-consulta"
                src={turma}
                alt="Consultar Instituição"
              />
            </div>
            <Link to="turma">
              <div className="content-consulta">
                <button className="button-consulta-consulta">
                  Consultar Turma
                </button>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <br />
        </div>
        <div>
          <br />
        </div>
      </div >
    </>
  );
}

export default Consulta;
