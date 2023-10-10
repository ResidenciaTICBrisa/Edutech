import React, { useEffect } from "react";

import "./ConsultaAluno.css";
import PessoaService from "../../../services/PessoaService";
import Header from "../../../components/header/Header";

const ConsultaAluno = () => {

  const [dados, setDados] = React.useState([]);

  useEffect(() => {
    PessoaService.getAlunos().then((res) => {
      setDados(res);
    });
  }, []);



  return (
    <>
      <Header />
      <div className="dark-background">
        <div>
          <h1>Consulta de Alunos</h1>
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
              <th>Data de Nascimento</th>
              <th>Acessa Internet</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((pessoa, index) => (
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
                <td>{pessoa.dataNascimento}</td>
                <td>{pessoa.acessaInternet ? 'Sim' : 'Não'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ConsultaAluno;
