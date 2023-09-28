import React from "react";
import "./CadastroAlunos.css";

function CadastroAlunosPage() {

  const handleFileDownload = () => {
    // Caminho para o arquivo xlsx
    const filePath = "lista_alunos.xlsx";

    // Cria um elemento <a> para iniciar o download
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "lista_alunos.xlsx";

    // Adiciona o link ao corpo do documento
    document.body.appendChild(link);

    // Clica no link para iniciar o download
    link.click();

    // Remove o link do corpo do documento
    document.body.removeChild(link);
  };


  return (
    <div>
      <button onClick={handleFileDownload}>Download</button>
    </div>
  );
}

export default CadastroAlunosPage;
