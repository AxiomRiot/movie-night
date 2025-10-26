import { MovieApi } from '../api/movieApi';

const api = new MovieApi();

export async function handleGetMovie() {
  const payload = {};

  const data = await api.getData(payload);

  return data;
}
