import React, { useState } from "react";

import "./CadastroAvaliacaoNovo.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

function CadastroAvaliacaoNovo() {
  const [dadosAvaliacao, setDadosAvaliacao] = useState({
    descricao: "",
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
    InstituicaoService.addAvaliacao(dadosAvaliacao).then((res) => {
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
                placeholder="Descrição"
                value={dadosAvaliacao.descricao}
                onChange={(e) => handleChangeTexto("descricao", e.target.value)}
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
