export default function getDate (date, str) {
  if (/(y+)/.test(str)) {
    str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let json = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in json) {
    if (new RegExp(`(${key})`).test(str)) {
      let obj = json[key] + ''
      str = str.replace(RegExp.$1, RegExp.$1.length === 1 ? obj : padLeftZero(obj))
    }
  }
  return str
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
