import { API, BASE_URL } from "./constants.api";

const filter = 
{
    '_sort': 'views',
    '_order':'asc',
    'title': 'json-server'
}

export const productApi = {
  getProductList: (page = 1, limit = 10, category, textSearch) => {
    const paginationString = `_page=${page}&_limit=${limit}`;

    // const filterObject = {};

    // const filterStringTest = Object.keys(filterObject).map(key => `${key}=${filterObject[key]}`).join('&').trim();


    const filterString = [
      ...(category ? [`category=${category}`] : []),
    ].join('&').trim();

    const textSearchString = (textSearch && textSearch !== '') ? `q=${textSearch}` : '';

    const queryString = [
        paginationString,
        ...(filterString !== '' ? [filterString] : []),
        ...(textSearchString !== '' ? [textSearchString] : []),
    ].join('&');

    return API.get(
      `${BASE_URL}/product?${queryString}`
    );
  },
  product: (id) => API.get(`${BASE_URL}/product/${id}`),
};
