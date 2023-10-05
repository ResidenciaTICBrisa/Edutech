import React, { useEffect } from "react";
import "./Consulta.css";
import PessoaService from "../../services/PessoaService";

const Consulta = () => {

  const [dados, setDados] = React.useState([]);

  useEffect(() => {
    PessoaService.getAlunos().then((res) => {
      setDados(res)
    });
  }, []);

 

  return (
    <>
      <div className="div-fundo-consulta">
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

export default Consulta;