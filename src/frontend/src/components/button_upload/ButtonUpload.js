import React, { useRef } from 'react';
import './ButtonUpload.css';

function ButtonUpload({ onFileSelected }) {
  const fileInputRef = useRef(null);

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
      <button
        className="file-upload-button"
        onClick={() => fileInputRef.current.click()}
      >
        Upload de Arquivo
      </button>
    </div>
  );
}

export default ButtonUpload;
