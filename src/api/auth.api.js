import { API, BASE_URL } from "./constants.api";

export const authApi = {
  login: (data) => API.post(`${BASE_URL}/auth/login`, data),
  register: (data) => API.post(`${BASE_URL}/auth/register`, data),
  profileAddress: (data) => API.post(`${BASE_URL}/contact`, data),
  getCustomerAddress: (customerId) =>
    API.get(`${BASE_URL}/contact/${customerId}`),
  deleteUser: (id) => API.delete(`${BASE_URL}/users`, id),
  getLoginAdmin: (page = 1, limit = 5, category, textSearch) => {
    const paginationString = `_page=${page}&_limit=${limit}`;

    // const filterObject = {};

    // const filterStringTest = Object.keys(filterObject).map(key => `${key}=${filterObject[key]}`).join('&').trim();

    const filterString = [...(category ? [`category=${category}`] : [])]
      .join("&")
      .trim();

    const textSearchString =
      textSearch && textSearch !== "" ? `q=${textSearch}` : "";

    const queryString = [
      paginationString,
      ...(filterString !== "" ? [filterString] : []),
      ...(textSearchString !== "" ? [textSearchString] : []),
    ].join("&");
    return API.get(`${BASE_URL}/users?${queryString}`);
  },
};
