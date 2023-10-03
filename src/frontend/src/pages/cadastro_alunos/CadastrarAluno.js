import React, { useState} from "react";
import Header from "../../components/header/Header";

import "./CadastrarAluno.css";

function CadastrarAluno() {
  
  const [dadosInstituicao, setdadosInstituicao] = useState({
    cpf: '',
    matricula: '',
    dataNascimento: '',
    acessaInternet: '',
  });
  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setdadosInstituicao({
      ...dadosInstituicao,
      [nomeCaixa]: novoTexto,
    });
  };
  const handleToggleCheckbox = (nomeCaixa, novoTexto) => {
    setdadosInstituicao({
      ...dadosInstituicao,
      caixa4: !dadosInstituicao.caixa,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Aluno', dadosInstituicao);
    // rota p salvar no banco
    window.location.href = "/cadastro/alunos";
  };

  const handleCancelar = () => {
    window.location.href = "/cadastro/alunos";
  }

  return (
    <>
    <Header />
    <div className="div-fundo-cadastrar">
        <p className="text-cadastrar">Cadastro de Aluno</p>
        <div className="div-fundo-content-cadastrar">
            <form onSubmit={handleSubmit}>
                <div className="caixa-texto-aluno">
                  <label className="label-aluno-span-text">Cpf</label>
                    <textarea
                        className="text-entrada"
                        placeholder="xxx.xxx.xxx-xx"
                        value={dadosInstituicao.cpf}
                        onChange={(e) => handleChangeTexto('cpf', e.target.value)}
                    />
                </div>
                <div className="caixa-texto-aluno">
                  <label className="label-aluno-span-text">Matricula</label>
                    <textarea
                        className="text-entrada"
                        placeholder="xxxxxxxx"
                        value={dadosInstituicao.matricula}
                        onChange={(e) => handleChangeTexto('matricula', e.target.value)}
                    />
                </div>
                <div className="caixa-texto-aluno">
                  <label className="label-aluno-span-text">Data de Nascimento</label>
                    <textarea
                        className="text-entrada"
                        placeholder="xx/xx/xxxx"
                        value={dadosInstituicao.dataNascimento}
                        onChange={(e) => handleChangeTexto('dataNascimento', e.target.value)}
                    />
                </div>
                <div className="espaco-cadastro"></div>
                <label className="label-aluno-span">O aluno possui acesso a Internet?</label>
                <div className="caixa-checkbox-aluno-cadastrar">
                  <input
                    type="checkbox"
                    className="checkbox-aluno-cadastrar"
                    checked={dadosInstituicao.caixa}
                    onChange={handleToggleCheckbox}
                  />
                </div>
                <div className="botao-cadastrar">
                  <button className="button-cancelar-inst" onClick={handleCancelar}>Cancelar</button>
                  <button className="button-cadastrar-inst" type="submit">Cadastrar Aluno</button>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}

export default CadastrarAluno;