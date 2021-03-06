import axios from 'axios'
import { Toast } from 'vant'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
localStorage.setItem('dh_base_URL', 'http://127.0.0.1:3000')

axios.interceptors.request.use(config => {
// Do something before request is sent
  let token = localStorage.getItem('current_dh_user_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
// Do something with request error
  // Toast.fail(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
// Do something before response is sent
  if (!response.data.data) {
    if (response.data.message === '用户信息验证失败') {
      Toast.fail(response.data.message)
      setTimeout(() => {
        location.href = '#/login'
      }, 1000)
    }
  }
  return response
}, error => {
// Do something with response error
  return Promise.reject(error)
})

export default axios
