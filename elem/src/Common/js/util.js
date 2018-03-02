export default function urlparse () {
  let url = window.location.search
  console.log(url)
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  console.log(arr)

  if (arr) {
    arr.foreach((item) => {
      let tempArr = item.subString(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
