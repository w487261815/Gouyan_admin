import axios from '../until/axios'

export function getCarousel(params) {
  return axios.get('/v1/carousel', {params});
}
export function addCarousel(params) {
  return axios.post('/v1/carousel', params);
}
export function updateCarouselOnly(ids,params) {
  return axios.put(`/v1/carousel/${ids}`,params);
}
export function delCarousel(params) {
  return axios.delete('/v1/carousel', params);
}
