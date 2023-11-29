import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./CadastroUnidadeNovo.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

function CadastroUnidadeNovo() {
  const navigate = useNavigate();
  const [dadosUnidade, setdadosUnidade] = useState({
    cnpjInstituicao: "",
    nivelEducacao: "",
    siglaEstado: "",
    cidade: "",
    bairro: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    cpfCoordenador: "",
    telefone: "",
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setdadosUnidade({
      ...dadosUnidade,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    InstituicaoService.addUnidade(dadosUnidade).then((res) => {
      if (res) {
        navigate("/consulta/unidade");
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
        <p className="text-cadastrar-unidade">Cadastro de Unidade</p>
        <div className="div-fundo-content-cadastrar">
          <form onSubmit={handleSubmit}>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">
                CNPJ da Instituição
              </label>
              <textarea
                className="text-entrada"
                placeholder="CNPJ da Instituição"
                value={dadosUnidade.cnpjInstituicao}
                onChange={(e) =>
                  handleChangeTexto("cnpjInstituicao", e.target.value)
                }
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">Nivel de Educacao</label>
              <textarea
                className="text-entrada"
                placeholder="Nivel de Educacao"
                value={dadosUnidade.nivelEducacao}
                onChange={(e) =>
                  handleChangeTexto("nivelEducacao", e.target.value)
                }
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">Sigla do Estado</label>
              <textarea
                className="text-entrada"
                placeholder="Sigla do Estado"
                value={dadosUnidade.siglaEstado}
                onChange={(e) =>
                  handleChangeTexto("siglaEstado", e.target.value)
                }
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">Cidade</label>
              <textarea
                className="text-entrada"
                placeholder="Cidade"
                value={dadosUnidade.cidade}
                onChange={(e) => handleChangeTexto("cidade", e.target.value)}
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">Bairro</label>
              <textarea
                className="text-entrada"
                placeholder="Bairro"
                value={dadosUnidade.bairro}
                onChange={(e) => handleChangeTexto("bairro", e.target.value)}
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">CEP</label>
              <textarea
                className="text-entrada"
                placeholder="CEP"
                value={dadosUnidade.cep}
                onChange={(e) => handleChangeTexto("cep", e.target.value)}
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">Logradouro</label>
              <textarea
                className="text-entrada"
                placeholder="Logradouro"
                value={dadosUnidade.logradouro}
                onChange={(e) =>
                  handleChangeTexto("logradouro", e.target.value)
                }
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">Número</label>
              <textarea
                className="text-entrada"
                placeholder="Número"
                value={dadosUnidade.numero}
                onChange={(e) => handleChangeTexto("numero", e.target.value)}
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">Complemento</label>
              <textarea
                className="text-entrada"
                placeholder="Complemento"
                value={dadosUnidade.complemento}
                onChange={(e) =>
                  handleChangeTexto("complemento", e.target.value)
                }
              />
            </div>
            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">
                CPF do Coordenador
              </label>
              <textarea
                className="text-entrada"
                placeholder="CPF do Coordenador"
                value={dadosUnidade.cpfCoordenador}
                onChange={(e) =>
                  handleChangeTexto("cpfCoordenador", e.target.value)
                }
              />
            </div>

            <div className="caixa-texto-unidade">
              <label className="label-aluno-span-text">
                Telefone
              </label>
              <textarea
                className="text-entrada"
                placeholder="Telefone"
                value={dadosUnidade.telefone}
                onChange={(e) =>
                  handleChangeTexto("telefone", e.target.value)
                }
              />
            </div>

            <div className="botao-cadastrar-unidade">
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

export default CadastroUnidadeNovo;
