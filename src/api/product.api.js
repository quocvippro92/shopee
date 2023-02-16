import { API, BASE_URL } from "./constants.api";

export const productApi = {
    getProductList: (page, limit,category, textSearch) => {
        return API.get(`${BASE_URL}/product?_page=${page}&_limit=${limit}&category=${category}`);
    },
    product: (id) => API.get(`${BASE_URL}/product/${id}`),
}