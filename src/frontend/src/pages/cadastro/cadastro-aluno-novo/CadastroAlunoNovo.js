import React, { useState } from "react";
import "./CadastroAlunoNovo.css";
import PessoaService from "../../../services/PessoaService";
import Header from "../../../components/header/Header";

function CadastroAlunoNovo() {
  const [dadosAluno, setDadosAluno] = useState({
    cpf: "",
    matricula: "",
    nome: "",
    genero: "",
    siglaEstado: "",
    cidade: "",
    bairro: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    dataNascimento: "",
    acessaInternet: true,
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setDadosAluno({
      ...dadosAluno,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do Aluno", dadosAluno);
    let data = [];
    data.push(dadosAluno);
    PessoaService.addAlunos(data).then((res) => {
      console.log(res);
      window.location.href = "/consulta/aluno";
    });
  };

  const handleCancelar = () => {
    window.location.href = "/cadastro/aluno";
  };

  return (
    <>
      <Header />
      <div className="dark-background">
        <p className="text-cadastrar">Cadastro de Novo Aluno</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">CPF</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="000.000.000-00"
                value={dadosAluno.cpf}
                onChange={(e) => handleChangeTexto("cpf", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Matricula</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="000000"
                value={dadosAluno.matricula}
                onChange={(e) => handleChangeTexto("matricula", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Nome</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Nome do Aluno"
                value={dadosAluno.nome}
                onChange={(e) => handleChangeTexto("nome", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Gênero</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Gênero do Aluno"
                value={dadosAluno.genero}
                onChange={(e) => handleChangeTexto("genero", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Estado</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Estado do Aluno"
                value={dadosAluno.siglaEstado}
                onChange={(e) =>
                  handleChangeTexto("siglaEstado", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Cidade</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Cidade"
                value={dadosAluno.cidade}
                onChange={(e) => handleChangeTexto("cidade", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Bairro</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Bairro"
                value={dadosAluno.bairro}
                onChange={(e) => handleChangeTexto("bairro", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">CEP</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="cep"
                value={dadosAluno.cep}
                onChange={(e) => handleChangeTexto("cep", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Logradouro</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="logradouro"
                value={dadosAluno.logradouro}
                onChange={(e) =>
                  handleChangeTexto("logradouro", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Número</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="numero"
                value={dadosAluno.numero}
                onChange={(e) => handleChangeTexto("numero", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Complemento</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="complemento"
                value={dadosAluno.complemento}
                onChange={(e) =>
                  handleChangeTexto("complemento", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">
                Data de Nascimento
              </label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Data de Nascimento"
                value={dadosAluno.dataNascimento}
                onChange={(e) =>
                  handleChangeTexto("dataNascimento", e.target.value)
                }
              />
            </div>

            <div className="espaco-cadastro"></div>

            <label className="label-aluno-span">
              O aluno possui acesso à Internet em casa?
            </label>
            <div className="caixa-checkbox-aluno-cadastrar">
              <input type="checkbox" className="checkbox-aluno-cadastrar" />
            </div>

            <div className="botao-cadastrar">
              <button className="button-cancelar-inst" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="button-cadastrar-inst" type="submit">
                Cadastrar Aluno
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastroAlunoNovo;
