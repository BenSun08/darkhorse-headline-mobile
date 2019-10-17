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

export const follow = function (followId) {
  return axios({
    method: 'get',
    url: `/user_follows/${followId}`
  })
}

export const unfollow = function (unfollowId) {
  return axios({
    method: 'get',
    url: `/user_unfollow/${unfollowId}`
  })
}

export const updateUserProfile = function (userId, data) {
  return axios({
    method: 'post',
    url: `/user_update/${userId}`,
    data
  })
}

export const getUserComments = function () {
  return axios({
    method: 'get',
    url: '/user_comments'
  })
}
