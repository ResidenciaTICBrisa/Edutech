import React from "react";
import CadastroAlunosPage from "./pages/cadastro_alunos/CadastroAlunos";
import CadastroInstituicaoPage from "./pages/cadastro_intituicao/CadastroInstituicao";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home"
const App = () => {
  return (
  <Router>
     <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/cadastro/instituicao" element={<CadastroInstituicaoPage/>} />
        <Route path="/cadastro/alunos" element={<CadastroAlunosPage/>} />
     </Routes>
  </Router>
  );
};

export default App;