import React, { useState } from "react";

import "./CadastroTurmaNovo.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

function CadastroTurmaNovo() {
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
    console.log("Dados da Turma", dadosTurma);
    InstituicaoService.addTurma(dadosTurma.idUnidade, {
      serie: dadosTurma.serie,
      letra: dadosTurma.letra,
      ano: dadosTurma.ano,
      idUnidade: dadosTurma.idUnidade,
    }).then((res) => {
      console.log(res);
      // window.location.href = "/consulta/turma";
    });
  };

  const handleCancelar = () => {
    window.location.href = "/cadastro";
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
            <div className="botao-cadastrar">
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
