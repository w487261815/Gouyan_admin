import axios from '../until/axios'

export function getFilm(params) {
  return axios.get('/v1/films', {params});
}
export function addFilm(params) {
  return axios.post('/v1/films', params);
}
export function getFilmOnly(params) {
  return axios.get(`/v1/films/${params}`);
}
export function updateSta(type,params) {
  return axios.post(`/v1/films/${type}`, params);
}



export function addClassify(params) {
  return axios.post('/v1/classify', params);
}
export function delClassify(params) {
  return axios.delete('/v1/classify', params);
}
export function updateClassify(params) {
  return axios.put('/v1/classify', params);
}

