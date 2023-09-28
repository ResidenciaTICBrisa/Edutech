import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroAlunosPage from './pages/CadastroAlunos';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/alunos/cadastro" element={<CadastroAlunosPage />} />
      </Routes>
    </Router>
  );
};

export default App;