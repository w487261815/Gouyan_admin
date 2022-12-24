import axios from '../until/axios'

export function getCinemaBrand(params) {
  return axios.get('/v1/cinemaBrand', {params});
}
export function addCinemaBrand(params) {
  return axios.post('/v1/cinemaBrand', params);
}

export function delCinemaBrand(params) {
  return axios.delete('/v1/cinemaBrand', params);
}

export function updateCinemaBrand(params) {
  return axios.put('/v1/cinemaBrand', params);
}

export function updateSta(type,params) {
  return axios.post(`/v1/cinemaBrand/${type}`, params);
}

export function getCinemaBrandType() {
  return axios.post('/v1/cinemaBrandList');
}
export function getCinemaBrandCity(params) {
  return axios.get('/v1/cinemaCityBrand',{params});
}