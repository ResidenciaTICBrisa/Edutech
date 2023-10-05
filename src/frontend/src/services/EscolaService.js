import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const EscolaService = {
  getEscolas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/escolas`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  findEscola: async (cnpj) => {
    try {
      const response = await axios.get(`${BASE_URL}/escolas/${cnpj}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getUnidadesEscola: async (cnpj) => {
    try {
      const response = await axios.get(`${BASE_URL}/escolas/${cnpj}/unidades`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  findUnidadeEscola: async (cnpj, id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/escolas/${cnpj}/unidades/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getDisciplinasUnidade: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/unidades/${id}/disciplinas`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getTurmasUnidade: async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/unidades/${id}/turmas`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default EscolaService;
