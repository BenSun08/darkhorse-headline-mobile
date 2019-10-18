import axios from '@/utils/my-axios.js'

export const getColumnsList = function () {
  return axios({
    method: 'get',
    url: '/category'
  })
}

export const getArticlesList = function (params) {
  return axios({
    method: 'get',
    url: '/post',
    params
  })
}

export const getArticleById = function (id) {
  return axios({
    method: 'get',
    url: `/post/${id}`
  })
}

export const likeArticle = function (id) {
  return axios({
    method: 'get',
    url: `/post_like/${id}`
  })
}

export const starArticle = function (id) {
  return axios({
    method: 'get',
    url: `/post_star/${id}`
  })
}

export const getCommentsById = function (id) {
  return axios({
    method: 'get',
    url: `/post_comment/${id}`
  })
}

export const postComment = function (id, data) {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
