import { API, BASE_URL } from "./constants.api";

export const adminApi = {
  createProductAdmin: (data) => API.post(`${BASE_URL}/listProductUser`, data),
  updateOrderAdmin: (cardId, data) =>
    API.patch(`${BASE_URL}/listProductUser`, cardId, data),
  getOrderAdmin: (page = 1, limit = 5, category, textSearch) => {
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
    return API.get(`${BASE_URL}/listProductUser?${queryString}`);
  },

  deleteProductAdmin: (id) => API.delete(`${BASE_URL}/product`, id),
  deleteOrderAdmin: (id) => API.delete(`${BASE_URL}/listProductUser`, id),
  createProductsAdmin: (data) => API.post(`${BASE_URL}/product`, data),
};
