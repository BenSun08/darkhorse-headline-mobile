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

export const getMyFollows = function () {
  return axios({
    method: 'get',
    url: `/user_follows`
  })
}

export const updateUserProfile = function (userId, data) {
  return axios({
    method: 'post',
    url: `/user_update/${userId}`,
    data
  })
}
