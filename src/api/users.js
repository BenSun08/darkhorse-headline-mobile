import axios from '@/utils/my-axios.js'

export const userLogin = function (data) {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

export const userRegister = function (data) {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

export const getUserProfile = function (userId) {
  return axios({
    method: 'get',
    url: `/user/${userId}`
  })
}
