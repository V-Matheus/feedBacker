export default (httpClient) => ({
  login: async ({ email, password }) => {
    const response = await httpClient.post("/auth/login", {
      email,
      password,
    });

    let erros = null;

    if (!response.data) {
      erros = {
        status: response.request.status,
        statusText: response.request.statusText
      };
    }

    return { data: response.data, erros };
  },
});
