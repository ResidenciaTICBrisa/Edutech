import React from 'react';

import { Link } from 'react-router-dom';
import './Cadastro.css';

function Cadastro() {
    return (
        <div className="dark-background button-container">
            <Link to="/cadastro/aluno">
                <button className="styled-button">
                    Cadastro de Aluno
                </button>
            </Link>

            <Link to="/cadastro/instituicao">
                <button className="styled-button">
                    Cadastro de Instituição
                </button>
            </Link>
        </div>
    );
}

export default Cadastro;
