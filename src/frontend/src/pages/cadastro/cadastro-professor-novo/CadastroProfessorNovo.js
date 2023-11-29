import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./CadastroProfessorNovo.css";
import PessoaService from "../../../services/PessoaService";
import Header from "../../../components/header/Header";

function CadastroProfessorNovo() {
  const navigate = useNavigate();
  const [dadosProfessor, setDadosProfessor] = useState({
    cpf: "",
    matricula: "",
    nome: "",
    genero: "",
    formacao: "",
    siglaEstado: "",
    cidade: "",
    bairro: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    telefone: "",
    disciplinas: "",
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setDadosProfessor({
      ...dadosProfessor,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dadosProfessor.disciplinas = dadosProfessor.disciplinas.split(",");
    let data = [];
    data.push(dadosProfessor);
    PessoaService.addProfessor(data).then((res) => {
      if (res) {
        navigate("/consulta/professor");
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
        <p className="text-cadastrar">Cadastro de Novo Professor</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">CPF</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="000.000.000-00"
                value={dadosProfessor.cpf}
                onChange={(e) => handleChangeTexto("cpf", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Matricula</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="000000"
                value={dadosProfessor.matricula}
                onChange={(e) => handleChangeTexto("matricula", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Nome</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Nome"
                value={dadosProfessor.nome}
                onChange={(e) => handleChangeTexto("nome", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Gênero</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Gênero"
                value={dadosProfessor.genero}
                onChange={(e) => handleChangeTexto("genero", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">
                Formação
              </label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Formação"
                value={dadosProfessor.formacao}
                onChange={(e) =>
                  handleChangeTexto("formacao", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Estado</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Estado"
                value={dadosProfessor.siglaEstado}
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
                value={dadosProfessor.cidade}
                onChange={(e) => handleChangeTexto("cidade", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Bairro</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Bairro"
                value={dadosProfessor.bairro}
                onChange={(e) => handleChangeTexto("bairro", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">CEP</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="CEP"
                value={dadosProfessor.cep}
                onChange={(e) => handleChangeTexto("cep", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Logradouro</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Logradouro"
                value={dadosProfessor.logradouro}
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
                placeholder="Número"
                value={dadosProfessor.numero}
                onChange={(e) => handleChangeTexto("numero", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Complemento</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Complemento"
                value={dadosProfessor.complemento}
                onChange={(e) =>
                  handleChangeTexto("complemento", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Telefone</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="Telefone"
                value={dadosProfessor.telefone}
                onChange={(e) =>
                  handleChangeTexto("telefone", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Disciplinas</label>
              <input
                type="text"
                className="text-entrada"
                placeholder="1,3,7"
                value={dadosProfessor.disciplinas}
                onChange={(e) =>
                  handleChangeTexto("disciplinas", e.target.value)
                }
              />
            </div>

            <div className="botao-cadastrar-professor">
              <button className="button-cancelar-inst" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="button-cadastrar-inst" type="submit">
                Cadastrar Professor
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastroProfessorNovo;
