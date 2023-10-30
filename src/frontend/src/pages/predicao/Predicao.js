import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import Header from "../../components/header/Header";
import "./Predicao.css";
import InstituicaoService from "../../services/InstituicaoService";

const Predicao = () => {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState({
    disciplina: "Matematica",
    avaliacao: "G1",
  });
  const [disciplinas, setDisciplinas] = useState([]);
  const avaliacoes = ["G1", "G2", "G3"];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDisciplinas();
  }, []);

  const handleChangeTexto = (campo, valor) => {
    setDados([]);
    setFiltro({ ...filtro, [campo]: valor });
  };

  const getDisciplinas = () => {
    InstituicaoService.getDisciplinas().then((disciplinas) => {
      const nomesDisciplinas = disciplinas.map((disciplina) => disciplina.nome);
      const disciplinasUnicas = [...new Set(nomesDisciplinas)];
      setDisciplinas(disciplinasUnicas);
      setIsLoading(false);
    }, (error) => {
      console.log(error);
    });
  };

  const search = () => {
    InstituicaoService.getInfoPredicao(
      filtro.disciplina,
      filtro.avaliacao
    ).then((res) => {
      setDados(res);
      setIsLoading(false);
    });
  };

  const handleSearchButtonClick = () => {
    setIsLoading(true);
    search();
  };

  return (
    <>
      <Header />
      <div className="dark-background">
        <div>
          <h1>Consulta de Predição</h1>
        </div>
        <div>
          <div>
            <select
              value={filtro.disciplina}
              id="disciplina"
              onChange={(e) => handleChangeTexto("disciplina", e.target.value)}
            >
              <option value="">Selecione uma disciplina</option>
              {disciplinas.map((disciplina, index) => (
                <option key={index} value={disciplina}>
                  {disciplina}
                </option>
              ))}
            </select>

            <select
              value={filtro.avaliacao}
              id="avaliacao"
              onChange={(e) => handleChangeTexto("avaliacao", e.target.value)}
            >
              <option value="">Selecione uma avaliação</option>
              {avaliacoes.map((avaliacao, index) => (
                <option key={index} value={avaliacao}>
                  {avaliacao}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSearchButtonClick}>Buscar</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Instituição</th>
              <th>Gênero</th>
              <th>Idade</th>
              <th>Horas de Estudo Semanais</th>
              <th>Reprovações</th>
              <th>Aluno quer fazer educação superior</th>
              <th>Tem acesso à internet</th>
              <th>Faltas</th>
              {filtro.avaliacao === "G1" ? <th>Previsão da Nota 1</th> : ""}
              <th>Nota 1</th>
              {filtro.avaliacao === "G2" ? <th>Previsão da Nota 2</th> : ""}
              <th>Nota 2</th>
              {filtro.avaliacao === "G3" ? <th>Previsão da Nota 3</th> : ""}
              <th>Nota 3</th>
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
                  <td>{pessoa.disciplina}</td>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.matricula}</td>
                  <td>{pessoa.school}</td>
                  <td>{pessoa.sex}</td>
                  <td>{pessoa.age}</td>
                  <td>{pessoa.studytime}</td>
                  <td>{pessoa.failures}</td>
                  <td>{pessoa.higher ? "Sim" : "Não"}</td>
                  <td>{pessoa.internet ? "Sim" : "Não"}</td>
                  <td>{pessoa.absences}</td>
                  {filtro.avaliacao === "G1" ? <td>{pessoa.previsao_G1}</td> : ""}
                  <td>{pessoa.G1}</td>
                  {filtro.avaliacao === "G2" ? <td>{pessoa.previsao_G2}</td> : ""}
                  <td>{pessoa.G2}</td>
                  {filtro.avaliacao === "G3" ? <td>{pessoa.previsao_G3}</td> : ""}
                  <td>{pessoa.G3}</td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </>
  );
};

export default Predicao;
