import axios from '../until/axios'

export function getTicket(params) {
  return axios.get('/v1/ticket', {params});
}
export function addTicket(params) {
  return axios.post('/v1/ticket', params);
}
export function updateTicketOnly(ids,params) {
  return axios.put(`/v1/ticket/${ids}`,params);
}
export function delTicket(params) {
  return axios.delete('/v1/ticket', params);
}
export function getOnlyTicket(params) {
  return axios.get(`/v1/ticket/${params}`);
}