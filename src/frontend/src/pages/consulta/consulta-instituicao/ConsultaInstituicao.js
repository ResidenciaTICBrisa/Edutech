import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaInstituicao.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaInstituicao = () => {
  const [dados, setDados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    InstituicaoService.getInstituicoes().then((res) => {
      setDados(res);
      setIsLoading(false);
    });
  }, []);


  return (
    <>
      <Header />
      <div className="dark-background">
        <div>
          <h1>Consulta de Instituições</h1>
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
              {dados.map((pessoa, index) => (
                <tr key={index}>
                  <td>{pessoa.cnpj}</td>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.cpfDirecao}</td>
                  <td>{pessoa.email}</td>
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
