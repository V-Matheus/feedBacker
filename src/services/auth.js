export default (httpClient) => ({
  register: async ({ name, email, password }) => {
    const response = await httpClient.post("/auth/register", {
      name,
      email,
      password,
    });

    let erros = null;

    if (!response.data) {
      erros = {
        status: response.request.status,
        statusText: response.request.statusText,
      };
    }

    return { data: response.data, erros };
  },
  login: async ({ email, password }) => {
    const response = await httpClient.post("/auth/login", {
      email,
      password,
    });

    let erros = null;

    if (!response.data) {
      erros = {
        status: response.request.status,
        statusText: response.request.statusText,
      };
    }

    return { data: response.data, erros };
  },
});
