import React, { useState } from "react";

import "./CadastroDisciplinaNovo.css";
import EscolaService from "../../../services/EscolaService";
import Header from "../../../components/header/Header";

function CadastroDisciplinaNovo() {
  const [dadosDisciplina, setdadosDisciplina] = useState({
    idUnidade: "",
    nome: "",
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setdadosDisciplina({
      ...dadosDisciplina,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados da Disciplina", dadosDisciplina);
    EscolaService.addDisciplina(dadosDisciplina.idUnidade, { nome: dadosDisciplina.nome }).then((res) => {
      console.log(res);
      // window.location.href = "/consulta/disciplina";
    });
  };

  const handleCancelar = () => {
    window.location.href = "/cadastro";
  };

  return (
    <>
      <Header />
      <div className="dark-background">
        <p className="text-cadastrar">Cadastro de Disciplina</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto">
              <textarea
                className="text-entrada"
                placeholder="Id da Unidade"
                value={dadosDisciplina.idUnidade}
                onChange={(e) => handleChangeTexto("idUnidade", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <textarea
                className="text-entrada"
                placeholder="Nome da Disciplina"
                value={dadosDisciplina.nome}
                onChange={(e) => handleChangeTexto("nome", e.target.value)}
              />
            </div>
            <div className="botao-cadastrar">
              <button className="button-cancelar-inst" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="button-cadastrar-inst" type="submit">
                Cadastrar Disciplina
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastroDisciplinaNovo;
