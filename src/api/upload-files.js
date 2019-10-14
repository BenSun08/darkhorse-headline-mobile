import axios from '@/utils/my-axios.js'

export const uploadAvatar = function (formData) {
  return axios({
    method: 'post',
    url: '/upload',
    data: formData
  })
}
