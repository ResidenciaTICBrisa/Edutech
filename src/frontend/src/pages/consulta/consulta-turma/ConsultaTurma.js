import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaTurma.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaTurma = () => {
  const [dados, setDados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    InstituicaoService.getTurmas().then((res) => {
      setDados(res);
      setIsLoading(false);
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
          {isLoading && (
            <div className="loader-container">
              <Oval color="#007bff" height={100} width={100} />
            </div>
          )}

          {!dados ? <h2>Sem dados</h2> :
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
          }
        </table>
      </div>
    </>
  );
};

export default ConsultaTurma;
