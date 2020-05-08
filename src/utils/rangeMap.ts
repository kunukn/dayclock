// map value x in range [a,b] to [c,d]
export default function rangeMap(x, a, b, c, d) {
  if (a === b) return c
  if (c === d) return c
  return ((x - a) / (b - a)) * (d - c) + c
}
