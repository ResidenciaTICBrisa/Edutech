import React from 'react';

import { Link } from 'react-router-dom';
import Header from "../../components/header/Header";
import './Cadastro.css';

function Cadastro() {
    return (
        <><Header /><div className="dark-background button-container">
            <Link to="aluno">
                <button className="styled-button">
                    Cadastro de Aluno
                </button>
            </Link>

            <Link to="instituicao">
                <button className="styled-button">
                    Cadastro de Instituição
                </button>
            </Link>
        </div></>
    );
}

export default Cadastro;
