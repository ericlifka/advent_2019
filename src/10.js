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
// line: y = m*x + b
const getLineBetween =
( first, second
, slope = (first.y - second.y) / (first.x - second.x)) => (
  { m: slope
  , b: slope * first.x * -1 + first.y
  })

const checkPointOnLine = (line, point) => line.m * point.x + line.b == point.y
const sameLine = (left, right) => left.m == right.m && left.b == right.b

export const _day10part1 = () => {
  let lines =
  coords.map( first =>
    coords
      .map( second =>
        first == second
          ? null
          : getLineBetween(first, second))
      .filter(elem => !!elem))

  let reducedLines = lines.map( coordLines => {
    coordLines.sort((left, right) =>
      left.m == right.m
        ? left.b - right.b
        : left.m - right.m)

    for (let i = 1; i < coordLines.length; i++) {
      if (sameLine(coordLines[i], coordLines[i - 1])) {
        coordLines[i - 1] = null
      }
    }

    return coordLines.filter(line => !!line)
  })
  let max = 0, maxIndex = -1
  reducedLines.forEach((lines, i) => {
    console.log(coords[i], lines.length, lines)
    if (lines.length >= max) {
      max = lines.length
      maxIndex = i
    }
  })

  console.log('max:', coords[max], reducedLines[max].length)

  // for (let first = 0; first < coords.length; first++) {
  //   coords[first].count = coords.length - 1

  //   for (let second = 0; second < coords.length; second++) {
  //     if (second == first) continue

  //     let line = getLineBetween(coords[first], coords[second])
  //     console.log(JSON.stringify(line))

  //     for (let third = 0; third < coords.length; third++) {
  //       if (third == second || third == first) continue

  //       if (checkPointOnLine(line, coords[third])) {
  //         coords[first].count--
  //       }
  //     }
  //   }
  // }

  // coords.sort((left, right) => left.count - right.count)
  // return JSON.stringify(coords)
}

export const day10part2 = () =>
  null