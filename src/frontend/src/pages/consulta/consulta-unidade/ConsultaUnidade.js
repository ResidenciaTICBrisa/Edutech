import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaUnidade.css";
import InstituicaoService from "../../../services/InstituicaoService";
import Header from "../../../components/header/Header";

const ConsultaUnidade = () => {
  const [dados, setDados] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    InstituicaoService.getUnidades().then((res) => {
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
          <h1>Consulta de Unidades</h1>
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
              <th>id Unidade</th>
              <th>Nome</th>
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
          {isLoading && (
            <div className="loader-container">
              <Oval color="#007bff" height={100} width={100} />
            </div>
          )}

          {!dados ? <h2>Sem dados</h2> :
            <tbody>
              {dados
                .filter(customFilter)
                .map((unidade, index) => (
                  <tr key={index}>
                    <td>{unidade.idUnidade}</td>
                    <td>{unidade.nome}</td>
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
          }
        </table>
      </div>
    </>
  );
};

export default ConsultaUnidade;
