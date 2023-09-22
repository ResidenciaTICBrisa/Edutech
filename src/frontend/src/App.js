import React, { useState } from "react";
import axios from "axios";

function App() {
  const [instituicao, setInstituicao] = useState({
    nome: "",
    endereco: "",
    // Outros campos relevantes para o cadastro de instituições
  });

  const [credenciaisLogin, setCredenciaisLogin] = useState({
    nomeUsuario: "",
    senha: "",
  });

  const handleInstituicaoInputChange = (event) => {
    const { name, value } = event.target;
    setInstituicao({ ...instituicao, [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setCredenciaisLogin({ ...credenciaisLogin, [name]: value });
  };

  const handleInstituicaoSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar os dados da instituição para o servidor
      const response = await axios.post(
        "http://localhost:8000/cadastrar_instituicao",
        instituicao
      );
      console.log(response.data); // Mensagem de sucesso do servidor
    } catch (error) {
      console.error("Erro ao cadastrar instituição:", error);
    }
  };

  const handleInstituicaoLogin = async (event) => {
    event.preventDefault();
    try {
      // Enviar as credenciais de login para o servidor
      const response = await axios.post(
        "http://localhost:8000/login_instituicao",
        credenciaisLogin
      );
      console.log(response.data); // Mensagem de sucesso do servidor ou token de autenticação
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="App">
      <h2>Cadastrar Instituição</h2>
      <form onSubmit={handleInstituicaoSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={instituicao.nome}
            onChange={handleInstituicaoInputChange}
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={instituicao.endereco}
            onChange={handleInstituicaoInputChange}
          />
        </div>
        {/* Outros campos do formulário de cadastro de instituições */}
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Login da Instituição</h2>
      <form onSubmit={handleInstituicaoLogin}>
        <div>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            name="nomeUsuario"
            value={credenciaisLogin.nomeUsuario}
            onChange={handleLoginInputChange}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={credenciaisLogin.senha}
            onChange={handleLoginInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
