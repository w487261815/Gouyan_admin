import axios from '../until/axios'

export function login(params) {
  return axios.post('/v1/adminUser/login', params);
}

export function logout() {
  return axios.delete('/v1/adminUser/logout')
}

export function getUserInfo() {
  return axios.get('/v1/adminUser/profile');
}

export function changName(params) {
  return axios.put('/v1/adminUser/name',params);
}

export function changPass(params) {
  return axios.put('/v1/adminUser/password',params);
}

export function changeImg(params) {
  return axios.put('/v1/adminUser/img',params);
}