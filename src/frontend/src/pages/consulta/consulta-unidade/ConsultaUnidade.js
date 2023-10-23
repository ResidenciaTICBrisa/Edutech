import React, { useEffect } from "react";

import "./ConsultaUnidade.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaUnidade = () => {
  const [dados, setDados] = React.useState([]);

  useEffect(() => {
    InstituicaoService.getUnidades().then((res) => {
      setDados(res);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="dark-background">
        <div>
          <h1>Consulta de Unidades</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>id Unidade</th>
              <th>CNPJ da Instituicao</th>
              <th>Nível de Educação</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Bairro</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Número</th>
              <th>Complemento</th>
              <th>CPF do Coordenador</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((unidade, index) => (
              <tr key={index}>
                <td>{unidade.idUnidade}</td>
                <td>{unidade.cnpjInstituicao}</td>
                <td>{unidade.nivelEducacao}</td>
                <td>{unidade.siglaEstado}</td>
                <td>{unidade.cidade}</td>
                <td>{unidade.bairro}</td>
                <td>{unidade.cep}</td>
                <td>{unidade.logradouro}</td>
                <td>{unidade.numero}</td>
                <td>{unidade.complemento}</td>
                <td>{unidade.cpfCoordenador}</td>
                <td>{unidade.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ConsultaUnidade;
