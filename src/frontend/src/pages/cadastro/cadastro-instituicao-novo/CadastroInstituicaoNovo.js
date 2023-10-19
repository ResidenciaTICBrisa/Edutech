import React, { useState } from "react";

import "./CadastroInstituicaoNovo.css";
import EscolaService from "../../../services/EscolaService";
import Header from "../../../components/header/Header";

function CadastroInstituicaoNovo() {
  const [dadosInstituicao, setdadosInstituicao] = useState({
    nome: "",
    cnpj: "",
    cpfDirecao: "",
    email: "",
    senha: "",
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setdadosInstituicao({
      ...dadosInstituicao,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados da Instituição", dadosInstituicao);
    EscolaService.addEscola(dadosInstituicao).then((res) => {
      console.log(res);
      window.location.href = "/consulta/instituicao";
    });
  };

  const handleCancelar = () => {
    window.location.href = "/cadastro/instituicao";
  };

  return (
    <>
      <Header />
      <div className="dark-background">
        <p className="text-cadastrar-inst">Cadastro de Instituição</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">
                Nome
              </label>
              <textarea
                className="text-entrada"
                placeholder="Nome"
                value={dadosInstituicao.nome}
                onChange={(e) => handleChangeTexto("nome", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">
                CNPJ
              </label>
              <textarea
                className="text-entrada"
                placeholder="CNPJ"
                value={dadosInstituicao.cnpj}
                onChange={(e) => handleChangeTexto("cnpj", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">
              CPF Direção
              </label>
              <textarea
                className="text-entrada"
                placeholder="CPF Direção"
                value={dadosInstituicao.cpfDirecao}
                onChange={(e) =>
                  handleChangeTexto("cpfDirecao", e.target.value)
                }
              />
            </div>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">
              Email
              </label>
              <textarea
                className="text-entrada"
                placeholder="Email"
                value={dadosInstituicao.email}
                onChange={(e) => handleChangeTexto("email", e.target.value)}
              />
            </div>
            <div className="caixa-texto">
              <label className="label-aluno-span-text">
              Senha
              </label>
              <textarea
                className="text-entrada"
                placeholder="Senha"
                type="password"
                value={dadosInstituicao.senha}
                onChange={(e) => handleChangeTexto("senha", e.target.value)}
              />
            </div>
            <div className="botao-cadastrar">
              <button className="button-cancelar-inst" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="button-cadastrar-inst" type="submit">
                Cadastrar Instituição
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastroInstituicaoNovo;
