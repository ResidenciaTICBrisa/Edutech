import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import "./ConsultaAluno.css";
import PessoaService from "../../../services/PessoaService";
import Header from "../../../components/header/Header";

const ConsultaAluno = () => {
  const [dados, setDados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    PessoaService.getAlunos().then((res) => {
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
          <h1>Consulta de Alunos</h1>
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
              <th>CPF</th>
              <th>Matrícula</th>
              <th>Nome</th>
              <th>Gênero</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Bairro</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Número</th>
              <th>Complemento</th>
              <th>Telefone</th>
              <th>Data de Nascimento</th>
              <th>Acessa Internet</th>
              <th>Quer Educação Superior</th>
              <th>Série</th>
              <th>Letra</th>
              <th>Ano</th>
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
                .map((pessoa, index) => (
                  <tr key={index}>
                  <td>{pessoa.cpf}</td>
                  <td>{pessoa.matricula}</td>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.genero}</td>
                  <td>{pessoa.siglaEstado}</td>
                  <td>{pessoa.cidade}</td>
                  <td>{pessoa.bairro}</td>
                  <td>{pessoa.cep}</td>
                  <td>{pessoa.logradouro}</td>
                  <td>{pessoa.numero}</td>
                  <td>{pessoa.complemento}</td>
                  <td>{pessoa.telefone}</td>
                  <td>{pessoa.dataNascimento}</td>
                  <td>{pessoa.acessaInternet ? 'Sim' : 'Não'}</td>
                  <td>{pessoa.educacaoSuperior ? 'Sim' : 'Não'}</td>
                  <td>{pessoa.serie}</td>
                  <td>{pessoa.letra}</td>
                  <td>{pessoa.ano}</td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>

    </>
  );
}

export default ConsultaAluno;
