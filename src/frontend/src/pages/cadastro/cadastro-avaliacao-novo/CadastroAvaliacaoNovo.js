import React, { useState } from "react";

import "./CadastroAvaliacaoNovo.css";
import EscolaService from "../../../services/EscolaService";
import Header from "../../../components/header/Header";

function CadastroAvaliacaoNovo() {
  const [dadosAvaliacao, setDadosAvaliacao] = useState({
    tipo: "",
    peso: "",
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setDadosAvaliacao({
      ...dadosAvaliacao,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados da Avaliação", dadosAvaliacao);
    EscolaService.addAvaliacao(dadosAvaliacao).then((res) => {
      console.log(res);
      window.location.href = "/consulta/avaliacao";
    });
  };

  const handleCancelar = () => {
    window.location.href = "/cadastro";
  };

  return (
    <>
      <Header />
      <div className="dark-background">
        <p className="text-cadastrar">Cadastro de Avaliação</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto">
              <textarea
                className="text-entrada"
                placeholder="Tipo"
                value={dadosAvaliacao.tipo}
                onChange={(e) => handleChangeTexto("tipo", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <textarea
                className="text-entrada"
                placeholder="Peso"
                value={dadosAvaliacao.peso}
                onChange={(e) => handleChangeTexto("peso", e.target.value)}
              />
            </div>
           
            <div className="botao-cadastrar">
              <button className="button-cancelar-inst" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="button-cadastrar-inst" type="submit">
                Cadastrar Avaliação
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastroAvaliacaoNovo;
