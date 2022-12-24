import axios from '../until/axios'

export function getUsers(params) {
  return axios.get('/v1/users', {params});
}
export function updateSta(type,params) {
  return axios.post(`/v1/users/${type}`,params);
}
export function resetPass(id) {
  return axios.put(`/v1/users/${id}`);
}
