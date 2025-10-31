import axios from "axios";
export const api = axios.create({ baseURL: "https://api.tvmaze.com" });

export const searchShows = (q) =>
  api.get(`/search/shows?q=${encodeURIComponent(q)}`);
export const getShow = (id) => api.get(`/shows/${id}`);
export const getEpisodes = (id) => api.get(`/shows/${id}/episodes`);