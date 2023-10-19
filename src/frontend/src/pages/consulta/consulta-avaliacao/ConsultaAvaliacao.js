import React, { useEffect } from "react";

import "./ConsultaAvaliacao.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaAvaliacao = () => {
  const [dados, setDados] = React.useState([]);

  useEffect(() => {
    InstituicaoService.getAvaliacoes().then((res) => {
      setDados(res);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="dark-background">
        <div>
          <h1>Consulta de Avaliações</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id da Avaliação</th>
              <th>Descrição</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((avaliacao, index) => (
              <tr key={index}>
                <td>{avaliacao.idAvaliacao}</td>
                <td>{avaliacao.descricao}</td>
                <td>{avaliacao.peso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ConsultaAvaliacao;
