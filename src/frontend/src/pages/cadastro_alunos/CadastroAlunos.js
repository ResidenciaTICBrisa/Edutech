import React from "react";
import ButtonUpload from "../../components/button_upload/ButtonUpload";
import Header from "../../components/header/Header";
import * as XLSX from 'xlsx'

import add_document from "../../img/add_document.png";
import aluna from "../../img/aluna.png";

import "./CadastroAlunos.css";

function CadastroAlunos() {
  // const handleFileDownload = () => {
  //   // Caminho para o arquivo xlsx
  //   const filePath = "lista_alunos.xlsx";

  //   // Cria um elemento <a> para iniciar o download
  //   const link = document.createElement("a");
  //   link.href = filePath;
  //   link.download = "lista_alunos.xlsx";

  //   // Adiciona o link ao corpo do documento
  //   document.body.appendChild(link);

  //   // Clica no link para iniciar o download
  //   link.click();

  //   // Remove o link do corpo do documento
  //   document.body.removeChild(link);
  // };

  const handleFileSelected = (file) => {
    if (!file) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log('Dados do Excel:', excelData);
    };

    reader.readAsBinaryString(file);
    //rota p salvar aluno
  };

  const handleCadastro = () => {
    window.location.href = "/cadastro/alunos/cadastrar";
    //rota p salvar aluno
  };

  return (
    <>    
    <Header />
    {/* <div>
        <button onClick={handleFileDownload}>Download</button>
    </div> */}
    <div className="div-fundo-aluno">
        <p class="text-cadastro-aluno">Página de Cadastramento de Alunos</p>
      <div className="div-fundo-content">
        <div className="child-aluno">
          <div class="img-cadastro-aluno-content">
            <img class="img-cadastro-aluno" src={aluna} alt="Cadastrar Instituição"/>
          </div>
          <div class="content-aluno">
            <button className="button-cadastro-aluno" onClick={handleCadastro}>Cadastrar Aluno</button>
            <div class="h1-cadastro-aluno">Nesta opção é possível cadastrar um Aluno.</div>
          </div>
        </div>
        <div className="child-aluno">
          <div class="img-cadastro-aluno-content">
            <img class="img-cadastro-aluno" src={add_document} alt="Upload Instituição"/>
          </div>
          <div class="content-aluno">
            <ButtonUpload onFileSelected={handleFileSelected}/>
            <div class="h1-cadastro-aluno">Nesta opção é possível importar os dados de Alunos.</div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default CadastroAlunos;