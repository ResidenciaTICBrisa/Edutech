import React from "react";

import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Cadastro.css";
import aluno from "../../img/aluno.png";
import disciplina from "../../img/disciplina.png";
import turma from "../../img/turma.png";
import unidade from "../../img/unidade.png";
import instituicao from "../../img/instituicao.png";

function Cadastro() {
  return (
    <>
      <Header />
      <div className="div-fundo-cadastro">
        <p className="text-cadastro-cadastro">O que deseja cadastrar?</p>
        <div className="div-fundo-content">
          <div className="child-cadastro-1">
            <div className="img-cadastro-cadastro-content">
              <img className="img-cadastro-cadastro" src={aluno} alt="Aluno" />
            </div>
            <Link to="aluno">
              <div className="content-cadastro">
                <button className="button-cadastro-cadastro">
                  Cadastrar Aluno
                </button>
              </div>
            </Link>
          </div>

          <div className="child-cadastro-1">
            <div className="img-cadastro-cadastro-content">
              <img
                className="img-cadastro-cadastro"
                src={instituicao}
                alt="Cadastrar Instituição"
              />
            </div>
            <Link to="instituicao">
              <div className="content-cadastro">
                <button className="button-cadastro-cadastro">
                  Cadastrar Instituição
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="div-fundo-content">
          <div className="child-cadastro">
            <div className="img-cadastro-cadastro-content">
              <img
                className="img-cadastro-cadastro"
                src={unidade}
                alt="Cadastrar Unidade"
              />
            </div>
            <Link to="unidade">
              <div className="content-cadastro">
                <button className="button-cadastro-cadastro">
                  Cadastrar Unidade
                </button>
              </div>
            </Link>
          </div>

          <div className="child-cadastro">
            <div className="img-cadastro-cadastro-content">
              <img
                className="img-cadastro-cadastro"
                src={disciplina}
                alt="Cadastrar Disciplina"
              />
            </div>
            <Link to="/cadastro/cadastro/novo">
              <div className="content-cadastro">
                <button className="button-cadastro-cadastro">
                  Cadastrar Disciplina
                </button>
              </div>
            </Link>
          </div>

          <div className="child-cadastro">
            <div className="img-cadastro-cadastro-content">
              <img
                className="img-cadastro-cadastro"
                src={turma}
                alt="Cadastrar Instituição"
              />
            </div>
            <Link to="turma">
              <div className="content-cadastro">
                <button className="button-cadastro-cadastro">
                  Cadastrar Turma
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
      </div>
    </>
  );
}

export default Cadastro;
