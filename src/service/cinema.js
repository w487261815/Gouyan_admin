import axios from '../until/axios'

export function getCinema(params) {
  return axios.get('/v1/cinemas', {params});
}
export function addCinema(params) {
  return axios.post('/v1/cinemas', params);
}
export function getCinemaOnly(params) {
  return axios.get(`/v1/cinemas/${params}`);
}
export function updateCinemaOnly(ids,params) {
  return axios.put(`/v1/cinemas/${ids}`,params);
}
export function delCinema(params) {
  return axios.delete('/v1/cinemas', params);
}
export function updateSta(type,params) {
  return axios.post(`/v1/cinemas/${type}`, params);
}
export function getCinemaByCity(params) {
  return axios.get(`/v1/cinema/${params}`);
}