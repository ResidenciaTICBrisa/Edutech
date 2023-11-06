import React from "react";
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';

import ButtonUploadComponent from "../../../components/button_upload/ButtonUpload";
import add_document from "../../../img/add_document.png";
import aluno from "../../../img/aluno.png";
import PessoaService from "../../../services/PessoaService";
import Header from "../../../components/header/Header";
import "./CadastroAluno.css";

function CadastroAluno() {

  const navigate = useNavigate();

  const handleFileSelected = (file) => {
    if (!file) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      await handleCadastro(excelData);
    };
  };

  const handleCadastro = (excelData) => {
    const alunos = excelData
      .filter((row) => row.some((cell) => cell !== undefined && cell !== null && cell !== ''))
      .map((row, _) => ({
        cpf: String(row[0]) || "",
        matricula: String(row[1]) || "",
        nome: row[2] || "",
        genero: row[3] || "",
        siglaEstado: row[4] || "",
        cidade: row[5] || "",
        bairro: row[6] || "",
        cep: String(row[7]) || "",
        logradouro: row[8] || "",
        numero: row[9] || 0,
        complemento: row[10] || "",
        dataNascimento: row[11] || "",
        acessaInternet: !!row[12]
      }));

    alunos.shift(); // Remove o cabeçalho

    PessoaService.addAlunos(alunos).then((response) => {
      navigate("/consulta/aluno");
    });
  };

  return (
    <>
      <Header />
      <div className="div-fundo-aluno">
        <p className="text-cadastro-aluno">Página de Cadastramento de Alunos</p>
        <div className="div-fundo-content">
          <div className="child-aluno">
            <div className="img-cadastro-aluno-content">
              <img
                className="img-cadastro-aluno"
                src={aluno}
                alt="Cadastrar Instituição"
              />
            </div>
            <Link to="/cadastro/aluno/novo">
              <div className="content-aluno">
                <button className="button-cadastro-aluno">
                  Cadastrar Aluno
                </button>
                <div className="h1-cadastro-aluno">
                  Nesta opção é possível cadastrar um Aluno.
                </div>
              </div>
            </Link>
          </div>
          <div className="child-aluno">
            <div className="img-cadastro-aluno-content">
              <img
                className="img-cadastro-aluno"
                src={add_document}
                alt="Upload Instituição"
              />
            </div>
            <div className="content-aluno">
              <ButtonUploadComponent onFileSelected={handleFileSelected} />
              <div className="h1-cadastro-aluno">
                Nesta opção é possível importar os dados de Alunos.
              </div>
            </div>
          </div>
          <div className="espaco-cadastro-in-p"></div>
        </div>
      </div>
    </>
  );
}

export default CadastroAluno;
