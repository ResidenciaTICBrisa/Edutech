import React from "react";
import ButtonUpload from "../../components/button_upload/ButtonUpload";
import * as XLSX from "xlsx";

import add_document from "../../img/add_document.png";
import aluna from "../../img/aluna.png";
import "./CadastroAlunos.css";
import PessoaService from "../../services/PessoaService";

function CadastroAlunos() {

  // const [redirect, setRedirect] = useState(false);

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
    const alunos = excelData.map((row, _) => ({
      cpf: String(row[0]) || "",
      matricula: row[1] || 0,
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
  
    PessoaService.addAlunos(alunos)
      .then((response) => {
        console.log(response)
        // setRedirect(true);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar alunos:", error);
      });
  };

  return (
    <>
      <div className="div-fundo-aluno">
        <p className="text-cadastro-aluno">Página de Cadastramento de Alunos</p>
        <div className="div-fundo-content">
          <div className="child-aluno">
            <div className="img-cadastro-aluno-content">
              <img
                className="img-cadastro-aluno"
                src={aluna}
                alt="Cadastrar Instituição"
              />
            </div>
            <div className="content-aluno">
              <button
                className="button-cadastro-aluno"
                onClick={handleCadastro}
              >
                Cadastrar Aluno
              </button>
              <div className="h1-cadastro-aluno">
                Nesta opção é possível cadastrar um Aluno.
              </div>
            </div>
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
              <ButtonUpload onFileSelected={handleFileSelected} />
              <div className="h1-cadastro-aluno">
                Nesta opção é possível importar os dados de Alunos.
              </div>
            </div>
            {/* {redirect && window.location.replace("/consulta")} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastroAlunos;
