import axios from 'axios';

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemonList = async (limit = 10, offset = 0) => {
  return await pokeApi.get(`/pokemon?limit=${limit}&offset=${offset}`);
};

export const getPokemonDetail = async (id: number | string) => {
  return await pokeApi.get(`/pokemon/${id}`);
};

export const postUserFeedback = async (data: any) => {
  return await axios.post('https://6723fb74493fac3cf24cd48c.mockapi.io/api/v1/pokemon', data);
};
