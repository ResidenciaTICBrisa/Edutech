import React, { useEffect } from "react";
import PessoaService from "../../services/PessoaService";
import Header from "../../components/header/Header";

import './Predicao.css';

const Predicao = () => {

  const [dados, setDados] = React.useState([]);

  useEffect(() => {
    PessoaService.getAlunos().then((res) => {
      setDados(res);
    });
  }, []);
  

  return (
    <>
    <Header />
    <div className="dark-background">
        <div>
          <h1>Consulta de Predição</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Disciplina</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Nota Final</th>
              <th>APR/RP</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((pessoa, index) => (
              <tr key={index}>
                <td>{pessoa.nome}</td>
                <td>{pessoa.matricula}</td>
                <td>{pessoa.disciplina}</td>
                <td>{pessoa.nota1}</td>
                <td>{pessoa.nota2}</td>
                <td>{pessoa.nota3}</td>
                <td>{pessoa.nota_final}</td>
                <td>{pessoa.aprovado ? 'APR' : 'RP'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Predicao;
