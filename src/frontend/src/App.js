import React from "react";
import CadastroAlunosPage from "./pages/cadastro_alunos/CadastroAlunos";
import Header from "./components/header/Header";

const App = () => {
  return (
    <div>
      <Header />
      <CadastroAlunosPage />
    </div>
  );
};

export default App;
