import axios from 'axios'
import router from '../router'
import {Message , ElLoading} from 'element-ui'
import { localGet } from './index'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:28089/admin-api' : 'http://localhost:28089/admin-api'
//axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://150.158.191.247:28089/admin-api' : 'http://150.158.191.247:28089/admin-api'

axios.defaults.withCredentials = false
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = localGet('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'


axios.interceptors.request.use(config => {
	 NProgress.start();
  return config
})

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    this.$message.error('服务端异常');
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) 
    	Message.error(res.data.message)
    if (res.data.resultCode == 419) {
      store.state.islogin = 0
      router.push({ path: '/login' })
    }
  }
  NProgress.done();
  return res.data
})


export default axios