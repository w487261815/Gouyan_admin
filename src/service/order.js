import axios from '../until/axios'

export function getOrders(params) {
  return axios.get('/v1/order', {params});
}

export function checkDone(params) {
  return axios.put('/v1/order/checkDone', params);
}

export function checkOut(params) {
  return axios.put('/v1/order/checkOut', params);
}

export function close(params) {
  return axios.put('/v1/order/close', params);
}

export function getOrderDetail(ids) {
  return axios.get(`/v1/order/${ids}`);
}
