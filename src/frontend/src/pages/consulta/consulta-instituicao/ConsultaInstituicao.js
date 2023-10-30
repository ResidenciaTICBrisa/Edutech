import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaInstituicao.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaInstituicao = () => {
  const [dados, setDados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    InstituicaoService.getInstituicoes().then((res) => {
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
        <div>
          <h1>Consulta de Instituições</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Pesquisar por qualquer coluna"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>CNPJ</th>
              <th>Nome</th>
              <th>CPF do Diretor</th>
              <th>Email</th>
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
                .map((instituicao, index) => (
                  <tr key={index}>
                  <td>{instituicao.cnpj}</td>
                  <td>{instituicao.nome}</td>
                  <td>{instituicao.cpfDirecao}</td>
                  <td>{instituicao.email}</td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </>
  );
}

export default ConsultaInstituicao;
