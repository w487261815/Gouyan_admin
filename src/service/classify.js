import axios from '../until/axios'

export function getClassify(params) {
  return axios.get('/v1/classify', {params});
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
export function updateSta(type,params) {
  return axios.post(`/v1/classify/${type}`, params);
}
export function getClassifies(params) {
  return axios.get('/v1/classifies', {params});
}

