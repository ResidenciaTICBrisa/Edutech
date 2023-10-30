import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaProfessor.css";
import PessoaService from "../../../services/PessoaService";
import Header from "../../../components/header/Header";

const ConsultaProfessor = () => {
  const [dados, setDados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    PessoaService.getProfessores().then((res) => {
      setDados(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="dark-background">
        <div>
          <h1>Consulta de Professores</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Matrícula</th>
              <th>Nome</th>
              <th>Gênero</th>
              <th>Formação</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Bairro</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Número</th>
              <th>Complemento</th>
              <th>Telefone</th>
              <th>disciplinas Ministradas</th>
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
                  <td>{pessoa.cpf}</td>
                  <td>{pessoa.matricula}</td>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.genero}</td>
                  <td>{pessoa.formacao}</td>
                  <td>{pessoa.siglaEstado}</td>
                  <td>{pessoa.cidade}</td>
                  <td>{pessoa.bairro}</td>
                  <td>{pessoa.cep}</td>
                  <td>{pessoa.logradouro}</td>
                  <td>{pessoa.numero}</td>
                  <td>{pessoa.complemento}</td>
                  <td>{pessoa.telefone}</td>
                  <td>{pessoa.disciplinasMinistradas}</td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </>
  );
}

export default ConsultaProfessor;
