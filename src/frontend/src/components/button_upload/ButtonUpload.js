import React, { useRef } from 'react';
import "./ButtonUpload.css";


function ButtonUpload({ onFileSelected }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelected(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button className="file-upload-button" onClick={handleFileUpload}>Selecionar Arquivo</button>
    </div>
  );
}

export default ButtonUpload;