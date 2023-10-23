import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const InstituicaoService = {

  //#region Instituicao
  addInstituicao: async (instituicao) => {
    try {
      const response = await axios.post(`${BASE_URL}/instituicoes`, instituicao);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getInstituicoes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/instituicoes`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  //#endregion

  //#region Unidade
  addUnidade: async (unidade) => {
    try {
      const response = await axios.post(`${BASE_URL}/unidades`, unidade);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getUnidades: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/unidades`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getUnidadesInstituicao: async (cnpj) => {
    try {
      const response = await axios.get(`${BASE_URL}/instituicoes/${cnpj}/unidades`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  //#endregion

  //#region Disciplina
  addDisciplina: async (idUnidade, disciplina) => {
    try {
      const response = await axios.post(`${BASE_URL}/unidades/${idUnidade}/disciplinas`, disciplina);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  
  getDisciplinas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/disciplinas`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getDisciplinasUnidade: async (idUnidade) => {
    try {
      const response = await axios.get(`${BASE_URL}/unidades/${idUnidade}/disciplinas`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  //#endregion

  //#region Turma
  addTurma: async (idUnidade, turma) => {
    try {
      const response = await axios.post(`${BASE_URL}/unidades/${idUnidade}/turmas`, turma);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getTurmas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/turmas`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  
  getTurmasUnidade: async (idUnidade) => {
    try {
      const response = await axios.get(`${BASE_URL}/unidades/${idUnidade}/turmas`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  //#endregion

  //#region Predição
  getInfoPredicao: async (disciplina, avaliacao) => {
    try {
      const response = await axios.get(`${BASE_URL}/predicao/${disciplina}/avaliacao/${avaliacao}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  //#endregion

};

export default InstituicaoService;
