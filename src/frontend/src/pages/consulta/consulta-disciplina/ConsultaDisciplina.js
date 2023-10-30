import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaDisciplina.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaDisciplina = () => {
  const [dados, setDados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    InstituicaoService.getDisciplinas().then((res) => {
      setDados(res);
      setIsLoading(false);
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
          {isLoading && (
            <div className="loader-container">
              <Oval color="#007bff" height={100} width={100} />
            </div>
          )}

          {!dados ? <h2>Sem dados</h2> :
            <tbody>
              {dados.map((unidade, index) => (
                <tr key={index}>
                  <td>{unidade.codigo}</td>
                  <td>{unidade.nome}</td>
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

export default ConsultaDisciplina;
