import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaDisciplina.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaDisciplina = () => {
  const [dados, setDados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    InstituicaoService.getDisciplinas().then((res) => {
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
          <h1>Consulta de Disciplinas</h1>
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
              {dados
                .filter(customFilter)
                .map((disciplina, index) => (
                  <tr key={index}>
                  <td>{disciplina.codigo}</td>
                  <td>{disciplina.nome}</td>
                  <td>{disciplina.idUnidade}</td>
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
