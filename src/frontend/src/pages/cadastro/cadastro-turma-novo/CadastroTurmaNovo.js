import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./CadastroTurmaNovo.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

function CadastroTurmaNovo() {
  const navigate = useNavigate();
  const [dadosTurma, setdadosTurma] = useState({
    serie: "",
    letra: "",
    ano: "",
    idUnidade: "",
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setdadosTurma({
      ...dadosTurma,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    InstituicaoService.addTurma(dadosTurma.idUnidade, dadosTurma).then((res) => {
      if (res) {
        navigate("/consulta/turma");
      }
    });
  };

  const handleCancelar = () => {
    navigate("/cadastro");
  };

  return (
    <>
      <Header />
      <div className="dark-background">
        <p className="text-cadastrar-turma">Cadastro de Turma</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">Série</label>
              <textarea
                className="text-entrada"
                placeholder="Série"
                value={dadosTurma.serie}
                onChange={(e) => handleChangeTexto("serie", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">Letra</label>
              <textarea
                className="text-entrada"
                placeholder="Letra"
                value={dadosTurma.letra}
                onChange={(e) => handleChangeTexto("letra", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">Ano</label>
              <textarea
                className="text-entrada"
                placeholder="Ano"
                value={dadosTurma.ano}
                onChange={(e) => handleChangeTexto("ano", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">Id da Unidade</label>
              <textarea
                className="text-entrada"
                placeholder="Id da Unidade"
                value={dadosTurma.idUnidade}
                onChange={(e) => handleChangeTexto("idUnidade", e.target.value)}
              />
            </div>
            <div className="botao-cadastrar-turma">
              <button className="button-cancelar-inst" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="button-cadastrar-inst" type="submit">
                Cadastrar Unidade
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastroTurmaNovo;
