// @ts-nocheck

type t = {
  numbers?: any
  days?: any
  graph?: any
  color1?: any
  color2?: any
  bg?: any
  pagebg?: any
  daybg?: any
  text?: any
  pie?: any
  border?: any
  strap?: any
}

export default () => {
  let params: t = {}

  location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })

  return params
}
