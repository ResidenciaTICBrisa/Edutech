import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import CadastroInstituicao from "./pages/cadastro/cadastro-intituicao/CadastroInstituicao";
import CadastroInstituicaoNovo from "./pages/cadastro/cadastro-instituicao-novo/CadastroInstituicaoNovo";
import CadastroAluno from "./pages/cadastro/cadastro-aluno/CadastroAluno";
import CadastroAlunoNovo from "./pages/cadastro/cadastro-aluno-novo/CadastroAlunoNovo";
import CadastroUnidadeNovo from "./pages/cadastro/cadastro-unidade-novo/CadastroUnidadeNovo";
import CadastroDisciplinaNovo from "./pages/cadastro/cadastro-disciplina/CadastroDisciplinaNovo";
import CadastroTurmaNovo from "./pages/cadastro/cadastro-turma-novo/CadastroTurmaNovo";
import CadastroProfessorNovo from "./pages/cadastro/cadastro-professor-novo/CadastroProfessorNovo";

import Consulta from "./pages/consulta/Consulta";
import ConsultaInstituicao from "./pages/consulta/consulta-instituicao/ConsultaInstituicao";
import ConsultaAluno from "./pages/consulta/consulta-aluno/ConsultaAluno";
import ConsultaUnidade from "./pages/consulta/consulta-unidade/ConsultaUnidade";
import ConsultaDisciplina from "./pages/consulta/consulta-disciplina/ConsultaDisciplina";
import ConsultaTurma from "./pages/consulta/consulta-turma/ConsultaTurma";
import ConsultaProfessor from "./pages/consulta/consulta-professor/ConsultaProfessor";

import Predicao from "./pages/predicao/Predicao";
import SaibaMais from "./pages/saiba_mais/SaibaMais";
import Contato from "./pages/contato/Contato";
import Login from "./pages/login/Login";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/cadastro/", element: <Cadastro /> },
  { path: "/cadastro/instituicao", element: <CadastroInstituicao /> },
  { path: "/cadastro/instituicao/novo", element: <CadastroInstituicaoNovo /> },
  { path: "/cadastro/aluno", element: <CadastroAluno /> },
  { path: "/cadastro/aluno/novo", element: <CadastroAlunoNovo /> },
  { path: "/cadastro/unidade", element: <CadastroUnidadeNovo /> },
  { path: "/cadastro/disciplina", element: <CadastroDisciplinaNovo /> },
  { path: "/cadastro/turma", element: <CadastroTurmaNovo />},
  { path: "/cadastro/professor", element: <CadastroProfessorNovo />},

  { path: "/consulta/", element: <Consulta /> },
  { path: "/consulta/instituicao", element: <ConsultaInstituicao /> },
  { path: "/consulta/aluno", element: <ConsultaAluno /> },
  { path: "/consulta/unidade", element: <ConsultaUnidade /> },
  { path: "/consulta/disciplina", element: <ConsultaDisciplina /> },
  { path: "/consulta/turma", element: <ConsultaTurma /> },
  { path: "/consulta/professor", element: <ConsultaProfessor /> },

  { path: "/predicao", element: <Predicao /> },

  { path: "/saiba-mais", element: <SaibaMais /> },
  { path: "/contato", element: <Contato /> },
  { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
