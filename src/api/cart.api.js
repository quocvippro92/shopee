import { API, BASE_URL } from "./constants.api";

export const cartApi = {
  createCustomerCartItem: (data) => API.post(`${BASE_URL}/cart`, data),
  updateCart: (cardId,data) => API.patch(`${BASE_URL}/cart`,cardId,data),
  getCustomerCart: (customerId) =>
    API.get(`${BASE_URL}/cart?customer_id=${customerId}`),
  deleteCart: (id)=>API.delete(`${BASE_URL}/cart`,id)
};
