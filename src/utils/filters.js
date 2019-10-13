function zeroPadding (number) {
  if (number < 10) return '0' + number
  else return number
}

export const formatDate = function (dateObj) {
  let year = dateObj.getFullYear()
  let month = zeroPadding(dateObj.getMonth() + 1)
  let date = zeroPadding(dateObj.getDate())
  return year + '-' + month + '-' + date
}
