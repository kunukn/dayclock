export default function getDate() {
  let date = new Date()

  return {
    date,
    d: date.getDay(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  }
}
