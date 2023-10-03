import React, { useState} from "react";
import Header from "../../components/header/Header";

import "./CadastrarInstituicao.css";

function CadastrarInstituicao() {
 
  const Cadastrar = () => {
    window.location.href = "/cadastro/instituicao/cadastrar";
  };

  const [dadosInstituicao, setdadosInstituicao] = useState({
    nome: '',
    cnpj: '',
    cpfDirecao: '',
    email: '',
    senha: '',
  });

  const handleChangeTexto = (nomeCaixa, novoTexto) => {
    setdadosInstituicao({
      ...dadosInstituicao,
      [nomeCaixa]: novoTexto,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados da Instituição', dadosInstituicao);
    // rota p salvar no banco
    window.location.href = "/cadastro/instituicao";
    //adicionar mensagem de confirmacao de cadastro da instuicao
    //redirecionar para pagina cadastro monstrando informacoes cadastradas?
  };

  const handleCancelar = () => {
    window.location.href = "/cadastro/instituicao";
    //rota p salvar aluno
  }

  return (
    <>
    <Header />
    <div className="div-fundo-cadastrar">
        <p className="text-cadastrar">Cadastro de Instituição</p>
        <div className="div-fundo-content-cadastrar">
            <form onSubmit={handleSubmit}>
                <div className="caixa-texto">
                    <textarea
                        className="text-entrada"
                        placeholder="Nome"
                        value={dadosInstituicao.nome}
                        onChange={(e) => handleChangeTexto('nome', e.target.value)}
                    />
                </div>
                <div className="caixa-texto">
                    <textarea
                        className="text-entrada"
                        placeholder="Cnpj"
                        value={dadosInstituicao.cnpj}
                        onChange={(e) => handleChangeTexto('cnpj', e.target.value)}
                    />
                </div>
                <div className="caixa-texto">
                    <textarea
                        className="text-entrada"
                        placeholder="Cpf Direcao"
                        value={dadosInstituicao.cpfDirecao}
                        onChange={(e) => handleChangeTexto('cpfDirecao', e.target.value)}
                    />
                </div>
                <div className="caixa-texto">
                    <textarea
                        className="text-entrada"
                        placeholder="Email"
                        value={dadosInstituicao.email}
                        onChange={(e) => handleChangeTexto('email', e.target.value)}
                    />
                </div>
                <div className="caixa-texto">
                    <textarea
                        className="text-entrada"
                        placeholder="Senha"
                        type="password"
                        value={dadosInstituicao.senha}
                        onChange={(e) => handleChangeTexto('senha', e.target.value)}
                    />
                </div>
                <div className="botao-cadastrar">
                  <button className="button-cancelar-inst" onClick={handleCancelar}>Cancelar</button>
                  <button className="button-cadastrar-inst" type="submit">Cadastrar Instituição</button>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}

export default CadastrarInstituicao;