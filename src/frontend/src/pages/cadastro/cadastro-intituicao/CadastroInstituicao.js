import React from "react";
import * as XLSX from "xlsx";

import ButtonUpload from "../../../components/button_upload/ButtonUpload";
import add_document from "../../../img/add_document.png";
import Instituicao from "../../../img/instituicao.png";
import Header from "../../../components/header/Header";
import "./CadastroInstituicao.css";

function CadastroInstituicao() {
  const handleFileSelected = (file) => {
    if (!file) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log("Dados do Excel:", excelData);
    };

    reader.readAsBinaryString(file);
  };

  const handleCadastro = () => {
    window.location.href = "/cadastro/instituicao/novo";
  };

  return (
    <>
      <Header />
      <div className="div-fundo-instituicao">
        <p className="text-cadastro">Página de Cadastramento de Instituição</p>
        <div className="div-fundo-content">
          <div className="child">
            <div className="img-cadastro-content">
              <img
                className="img-cadastro"
                src={Instituicao}
                alt="Cadastrar Instituição"
              />
            </div>
            <div className="content">
              <button className="button-cadastro" onClick={handleCadastro}>
                Cadastrar Instituição
              </button>
              <div className="h1-cadastro">
                Nesta opção é possível cadastrar uma nova Instituição.
              </div>
            </div>
          </div>
          <div className="child">
            <div className="img-cadastro-content">
              <img
                className="img-cadastro"
                src={add_document}
                alt="Upload Instituição"
              />
            </div>
            <div className="content">
              <ButtonUpload onFileSelected={handleFileSelected} />
              <div className="h1-cadastro">
                Nesta opção é possível importar os dados de nova Instituição.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastroInstituicao;
