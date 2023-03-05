import { API, BASE_URL } from "./constants.api";

export const adminApi = {
  createProductAdmin: (data) => API.post(`${BASE_URL}/listProductUser`, data),
  updateProductAdmin: (cardId, data) =>
    API.patch(`${BASE_URL}/listProductUser`, cardId, data),
  getProductAdmin: (customerId) =>
    API.get(`${BASE_URL}/listProductUser?customer_id=${customerId}`),
  deleteProductAdmin: (id) => API.delete(`${BASE_URL}/listProductUser`, id),
};
