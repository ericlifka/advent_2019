import { getLines } from "./input-helpers.js"
import { splitter } from "./converters.js"

let coords =
getLines('10')
  .map(splitter())
  .map((line, y) =>
    line.map((char, x) =>
      char === '#'
        ? ({x, y})
        : null))
  .flat()
  .filter(elem => !!elem)

const splitPoints = pivot => {
  let left = []
    , right = []

  coords.forEach( point => {
    if (point.x < pivot.x)
      left.push(point)
    else if (point.x > pivot.x)
      right.push(point)
    else if (point.y < pivot.y)
      left.push(point)
    else if (point.y > pivot.y)
      right.push(point)
  })

  return [ left, right ]
}

const slopeBetween = (left, right) => ( left.y - right.y ) / ( left.x - right.x )

const countSlopes = point => {
  let [ left, right ] =
  splitPoints(point)
    .map( group => group
      .map( p => slopeBetween(p, point) ))
    .map( slopes => [...new Set(slopes)] )

  return left.length + right.length
}

export const day10part1 = () => {
  let results =
  coords
    .map( c => (
      { point: c
      , count: countSlopes(c)
      }))
    .sort((l, r) => r.count - l.count)

  results.forEach(r => console.log(JSON.stringify(r)))

  return JSON.stringify(results[ 0 ])
}

export const day10part2 = () =>
  null