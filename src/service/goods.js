import axios from '../until/axios'

export function getGoods(params) {
  return axios.get('/v1/goods', {params});
}
export function addGood(params) {
  return axios.post('/v1/goods', params);
}
export function getGoodOnly(params) {
  return axios.get(`/v1/goods/${params}`);
}
export function updateGoodOnly(ids,params) {
  return axios.put(`/v1/goods/${ids}`,params);
}
export function delGoods(params) {
  return axios.delete('/v1/goods', params);
}

export function updateSta(type,params) {
  return axios.post(`/v1/goods/${type}`, params);
}


