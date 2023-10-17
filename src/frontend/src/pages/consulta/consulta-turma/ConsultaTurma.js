import React, { useEffect } from "react";

import "./ConsultaTurma.css";
import EscolaService from "../../../services/EscolaService";
import Header from "../../../components/header/Header";

const ConsultaTurma = () => {
  const [dados, setDados] = React.useState([]);

  useEffect(() => {
    EscolaService.getTurmas().then((res) => {
      setDados(res);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="dark-background">
        <div>
          <h1>Consulta de Turmas</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id da Turma</th>
              <th>Série</th>
              <th>Letra</th>
              <th>Ano</th>
              <th>Id da Unidade</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((unidade, index) => (
              <tr key={index}>
                <td>{unidade.idTurma}</td>
                <td>{unidade.serie}</td>
                <td>{unidade.letra}</td>
                <td>{unidade.ano}</td>
                <td>{unidade.idUnidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ConsultaTurma;
