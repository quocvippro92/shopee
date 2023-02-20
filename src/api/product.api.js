import { API, BASE_URL } from "./constants.api";

export const productApi = {
    getProductList: (page, limit,category, textSearch) => {
        const filter = [
           ...[ category ? [`category=${category}`] : []],
           ...[ textSearch ? [`q=${textSearch}`] : []],
        ]

        const filterString = `&${filter.join('&')}`;

        return API.get(`${BASE_URL}/product?_page=${page}&_limit=${limit}${filterString}`);
    },
    product: (id) => API.get(`${BASE_URL}/product/${id}`),

}