import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Consulta from "./pages/consulta/Consulta";
import Login from "./pages/login/Login";
import Predicao from "./pages/predicao/Predicao";
import CadastroAlunoNovo from "./pages/cadastro/cadastro-aluno-novo/CadastroAlunoNovo";
import CadastroAluno from "./pages/cadastro/cadastro-aluno/CadastroAluno";
import CadastroInstituicaoNovo from "./pages/cadastro/cadastro-instituicao-novo/CadastroInstituicaoNovo";
import CadastroInstituicao from "./pages/cadastro/cadastro-intituicao/CadastroInstituicao";
import ConsultaAluno from "./pages/consulta/consulta-aluno/ConsultaAluno";
import ConsultaInstituicao from "./pages/consulta/consulta-instituicao/ConsultaInstituicao";
import SaibaMais from './pages/saiba_mais/SaibaMais'
import Contato from './pages/contato/Contato'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Menu Superior */}
        <Route path="/" exact element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/predicao" element={<Predicao />} />

        {/* Subrotas */}
        <Route path="/saiba-mais" element={<SaibaMais />} />
        <Route path="/contato" element={<Contato />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Cadastro */}
        <Route path="/cadastro/instituicao" element={<CadastroInstituicao />} />
        <Route path="/cadastro/instituicao/novo" element={<CadastroInstituicaoNovo />} />
        <Route path="/cadastro/aluno" element={<CadastroAluno />} />
        <Route path="/cadastro/aluno/novo" element={<CadastroAlunoNovo />} />

        {/* Consulta */}
        <Route path="/consulta/instituicao" element={<ConsultaInstituicao />} />
        <Route path="/consulta/aluno" element={<ConsultaAluno />} />


      </Routes>
    </Router>
  );
};

export default App;
