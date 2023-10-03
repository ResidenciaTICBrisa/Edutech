import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CadastroAlunosPage from "./pages/cadastro_alunos/CadastroAlunos";
import CadastroInstituicaoPage from "./pages/cadastro_intituicao/CadastroInstituicao";
import CadastrarInstituicao from "./pages/cadastro_intituicao/CadastrarInstituicao";

import Consulta from "./pages/consulta/Consulta"

import Predicao from "./pages/predicao/Predicao"

import Grafico from "./pages/grafico/Grafico"

import Feedback from "./pages/feedback/Feedback"

import Home from "./pages/home/Home"
const App = () => {
  return (
  <Router>
     <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/cadastro/instituicao" element={<CadastroInstituicaoPage/>} />
        <Route path="/cadastro/instituicao/cadastrar" element={<CadastrarInstituicao/>} />
        <Route path="/cadastro/alunos" element={<CadastroAlunosPage/>} />

        <Route path="/consulta" element={<Consulta/>} />
        <Route path="/predicao" element={<Predicao/>} />
        <Route path="/graficos" element={<Grafico/>} />
        <Route path="/feedback" element={<Feedback/>} />
     </Routes>
  </Router>
  );
};

export default App;