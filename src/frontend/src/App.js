import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="div-2">
      <div className="overlap">
        <img className="cerebro" alt="Cerebro" src="cerebro-1-1.png" />
        <div className="text-wrapper-3">Edutech</div>
        <div className="overlap-2">
          <div className="text-wrapper-4">Olá, usuárioooo</div>
          {/* <div className="text-wrapper-5">logout</div>
            <Logout className="logout-instance" /> */}
        </div>
      </div>
      <div className="overlap-3">
        <div className="rectangle-2" />
        <div className="text-wrapper-6">Predição</div>
        <div className="rectangle-3" />
        <div className="text-wrapper-7">Predição</div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group-2">
            <div className="rectangle-4" />
            <div className="text-wrapper-7">Predição</div>
          </div>
        </div>
        <div className="overlap-4">
          <div className="rectangle-2" />
          <div className="text-wrapper-7">Consulta</div>
          <div className="rectangle-3" />
          <div className="text-wrapper-8">Consulta</div>
          <div className="overlap-group-wrapper">
            <div className="overlap-group-2">
              <div className="rectangle-4" />
              <div className="text-wrapper-8">Consulta</div>
            </div>
          </div>
        </div>
        <div className="overlap-5">
          <div className="rectangle-2" />
          <div className="text-wrapper-7">Gráficos</div>
          <div className="rectangle-3" />
          <div className="text-wrapper-8">Gráficos</div>
          <div className="overlap-group-wrapper">
            <div className="overlap-group-2">
              <div className="rectangle-4" />
              <div className="text-wrapper-8">Gráficos</div>
            </div>
          </div>
        </div>
        <div className="overlap-6">
          <div className="rectangle-5" />
          <div className="text-wrapper-9">Cadastro</div>
          {/* <Link className="rectangle-6" to="#" /> */}
          <div className="text-wrapper-10">Cadastro</div>
        </div>
        <div className="overlap-7">
          <div className="rectangle-2" />
          <div className="text-wrapper-11">Feedback</div>
          <div className="rectangle-3" />
          <div className="text-wrapper-12">Feedback</div>
          <div className="overlap-wrapper">
            <div className="overlap-group-2">
              <div className="rectangle-4" />
              <div className="text-wrapper-12">Feedback</div>
            </div>
          </div>
        </div>
        <div className="overlap-8">
          <div className="text-wrapper-13">Página de Cadastramento</div>
          {/* <img className="excel" alt="Excel" src="excel-1.png" />
          <img className="aluna" alt="Aluna" src="aluna-2-1.png" /> */}
          <p className="p">
            Nesta opção é possível cadastrar um novo aluno para sua base de
            dados.
          </p>
          <p className="text-wrapper-14">
            Nesta opção é possível importar uma base de dados pré-preenchida.
          </p>
          {/* <Component
            className="component-13"
            divClassName="design-component-instance-node"
            overlapGroupClassName="component-instance"
            rectangleClassName="component-13-instance"
          />
          <PropertyDefaultWrapper className="component-14" property1="default" /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
