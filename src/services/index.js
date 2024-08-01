import axios from "axios";
import AuthService from "./auth";
// import router from "../router";
import UsersService from "./users";
import { setGlobalLoading } from "@/store/global";

const API_ENVS = {
  production: "",
  development: "",
  local: "http://localhost:3000",
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
});

httpClient.interceptors.request.use((config) => {
  setGlobalLoading(true);
  const token = window.localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // config.headers.common.Authorization = `Bearer ${token}`; => código mostrado na aula porém retorna undefined por não existir a propriedade common dentro de headers
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoading(false);
    return response;
  },
  (error) => {
    const canThrowAnError =
      error.request?.status === 0 || error.request?.status === 500;

    if (canThrowAnError) {
      setGlobalLoading(false);
      throw new Error(error.message);
    }

    if (error.response?.status === 401) {
      // router.push({ name: "Home" });     Erro de autorização da API gerando loop infinito de Erro
    }
    // setGlobalLoading(true); como está com erro sempre irá ficar carregando
    setGlobalLoading(false);

    return error;
  }
);

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
};
