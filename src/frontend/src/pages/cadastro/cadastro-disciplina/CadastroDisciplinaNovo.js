import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./CadastroDisciplinaNovo.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

function CadastroDisciplinaNovo() {
  const navigate = useNavigate();
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
    InstituicaoService.addDisciplina(dadosDisciplina.idUnidade, { nome: dadosDisciplina.nome }).then((res) => {
      if (res) {
        navigate("/consulta/disciplina");
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
        <p className="text-cadastrar-disciplina">Cadastro de Disciplina</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">
                Id da Unidade
              </label>
              <textarea
                className="text-entrada"
                placeholder="Id da Unidade"
                value={dadosDisciplina.idUnidade}
                onChange={(e) => handleChangeTexto("idUnidade", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">
                Nome da Disciplina
              </label>
              <textarea
                className="text-entrada"
                placeholder="Nome da Disciplina"
                value={dadosDisciplina.nome}
                onChange={(e) => handleChangeTexto("nome", e.target.value)}
              />
            </div>
            <div className="botao-cadastrar-disc">
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
