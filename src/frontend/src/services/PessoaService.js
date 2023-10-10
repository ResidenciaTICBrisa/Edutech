import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const PessoaService = {

  isUsuarioLogado: () => {
    return true;
  },

  login: async (loginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  apiIsUp: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/`);
      return response.data;
    } catch (error) {
      console.error("API não está respondendo", error);
    }
  },

  getAlunos: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/alunos`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  addAlunos: async (alunos) => {
    try {
      const response = await axios.post(`${BASE_URL}/alunos`, alunos);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  findAluno: async (matricula) => {
    try {
      const response = await axios.get(`${BASE_URL}/alunos/${matricula}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default PessoaService;
