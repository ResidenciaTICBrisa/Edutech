import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaTurma.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaTurma = () => {
  const [dados, setDados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    InstituicaoService.getTurmas().then((res) => {
      setDados(res);
      setIsLoading(false);
    });
  }, []);

  const customFilter = (pessoa) => {
    const searchLower = searchTerm.toLowerCase();

    return Object.values(pessoa).some((value) =>
      (value && value.toString().toLowerCase().includes(searchLower))
    );
  };

  return (
    <>
      <Header />
      <div className="dark-background">
        <div className="fundinho">
          <h1>Consulta de Turmas</h1>
        </div>
        <div class="search-bar">
          <input
            class="search-input"
            type="text"
            placeholder="Pesquisar por qualquer coluna"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              {dados
                .filter(customFilter)
                .map((turma, index) => (
                  <tr key={index}>
                  <td>{turma.idTurma}</td>
                  <td>{turma.serie}</td>
                  <td>{turma.letra}</td>
                  <td>{turma.ano}</td>
                  <td>{turma.idUnidade}</td>
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
