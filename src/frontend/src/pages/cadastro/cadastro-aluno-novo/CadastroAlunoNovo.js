import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./CadastroAlunoNovo.css";
import PessoaService from "../../../services/PessoaService";
import Header from "../../../components/header/Header";

function CadastroAlunoNovo() {
  const navigate = useNavigate();
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
    telefone: "",
    dataNascimento: "",
    acessaInternet: true,
    educacaoSuperior: true,
    serie: "",
    letra: "",
    ano: "",
    disciplinasCursadas: "",
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setDadosAluno({
      ...dadosAluno,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dadosAluno.disciplinasCursadas = dadosAluno.disciplinasCursadas.split(",");
    let data = [];
    data.push(dadosAluno);
    PessoaService.addAlunos(data).then((res) => {
      if (res) {
        navigate("/consulta/aluno");
      }
    });
  };

  const handleCancelar = (e) => {
    e.preventDefault();
    navigate("/cadastro/aluno");
  };

  return (
    <>
      <Header />
      <div className="dark-background">
        <p className="text-cadastrar-aluno-novo">Cadastro de Novo Aluno</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">CPF</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="000.000.000-00"
                value={dadosAluno.cpf}
                onChange={(e) => handleChangeTexto("cpf", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Matricula</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="000000"
                value={dadosAluno.matricula}
                onChange={(e) => handleChangeTexto("matricula", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Nome</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Nome do Aluno"
                value={dadosAluno.nome}
                onChange={(e) => handleChangeTexto("nome", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Gênero</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Gênero do Aluno"
                value={dadosAluno.genero}
                onChange={(e) => handleChangeTexto("genero", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Estado</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Estado"
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
                className="text-entrada-aluno-novo"
                placeholder="Cidade"
                value={dadosAluno.cidade}
                onChange={(e) => handleChangeTexto("cidade", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Bairro</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Bairro"
                value={dadosAluno.bairro}
                onChange={(e) => handleChangeTexto("bairro", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">CEP</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="CEP"
                value={dadosAluno.cep}
                onChange={(e) => handleChangeTexto("cep", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Logradouro</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Logradouro"
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
                className="text-entrada-aluno-novo"
                placeholder="Número"
                value={dadosAluno.numero}
                onChange={(e) => handleChangeTexto("numero", e.target.value)}
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Complemento</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Complemento"
                value={dadosAluno.complemento}
                onChange={(e) =>
                  handleChangeTexto("complemento", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">Telefone</label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Telefone"
                value={dadosAluno.telefone}
                onChange={(e) =>
                  handleChangeTexto("telefone", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">
                Data de Nascimento
              </label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Data de Nascimento"
                value={dadosAluno.dataNascimento}
                onChange={(e) =>
                  handleChangeTexto("dataNascimento", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">
                Série
              </label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Série"
                value={dadosAluno.serie}
                onChange={(e) =>
                  handleChangeTexto("serie", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">
                Turma
              </label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Turma"
                value={dadosAluno.letra}
                onChange={(e) =>
                  handleChangeTexto("letra", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">
                Ano de Ingresso
              </label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="Ano de Ingresso"
                value={dadosAluno.ano}
                onChange={(e) =>
                  handleChangeTexto("ano", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-aluno">
              <label className="label-aluno-span-text">
                Disciplinas
              </label>
              <input
                type="text"
                className="text-entrada-aluno-novo"
                placeholder="5,2,1"
                value={dadosAluno.disciplinasCursadas}
                onChange={(e) =>
                  handleChangeTexto("disciplinasCursadas", e.target.value)
                }
              />
            </div>
            <div className="espaco-cadastro"></div>
            
            <label className="label-aluno-span">
              O aluno possui acesso à Internet em casa?
            </label>
            <div className="caixa-checkbox-aluno-cadastrar">
              <input type="checkbox" value={dadosAluno.acessaInternet} className="checkbox-aluno-cadastrar" />
            </div>

            <label className="label-aluno-span">
              O aluno quer fazer educação superior?
            </label>
            <div className="caixa-checkbox-aluno-cadastrar">
              <input type="checkbox" value={dadosAluno.educacaoSuperior} className="checkbox-aluno-cadastrar" />
            </div>

            <div className="botao-cadastrar-aluno">
              <button className="button-cancelar-aluno" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="button-cadastrar-aluno" type="submit">
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
