import React, { useEffect } from "react";

import "./ConsultaDisciplina.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaDisciplina = () => {
  const [dados, setDados] = React.useState([]);

  useEffect(() => {
    InstituicaoService.getDisciplinas().then((res) => {
      setDados(res);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="dark-background">
        <div>
          <h1>Consulta de Disciplinas</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Disciplina</th>
              <th>Id Unidade</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((unidade, index) => (
              <tr key={index}>
                <td>{unidade.codigo}</td>
                <td>{unidade.nome}</td>
                <td>{unidade.idUnidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ConsultaDisciplina;
