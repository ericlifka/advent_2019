import { getLines } from "./input-helpers.js"
import { splitter } from "./converters.js"

let base = null
  , coords = getLines('10')
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

// const angleOfPoint = (point, origin) => {
//   let x = point.x - origin.x
//     , y = point.y - origin.y
//     , angle = 90 - Math.atan2(y, x) * 180 / Math.PI;

//   return angle < 0
//     ? angle + 360
//     : angle
// }

let distanceFromBase = meteor =>
  vectorLength(
    { x: meteor.x - base.x
    , y: meteor.y - base.y
    })

let vectorLength = ({x, y}) => Math.sqrt(x**2 + y**2)

let angleOfPoint = (point, origin) => {
  let translated =
    { x: point.x - origin.x
    , y: point.y - origin.y
    }
  let north =
    { x: 0
    , y: -1
    }

  let dotproduct = north.x * translated.x + north.y * translated.y
  let lengthCoef = vectorLength(north) * vectorLength(translated)
  let angle = Math.acos(dotproduct / lengthCoef) * 180 / Math.PI

  if (point.x < origin.x) {
    return 360 - angle
  }
  return angle
}

export const day10part1 = () => {
  let results = coords
    .map( c => (
      { point: c
      , count: countSlopes(c)
      }))
    .sort((l, r) => r.count - l.count)

  base = results[ 0 ].point
  return JSON.stringify(results[ 0 ])
}

export const day10part2 = () => {
  let meteors = coords
    .filter( ({x, y}) => x !== base.x || y !== base.y )
    .map( meteor => (
      { meteor
      , angle: angleOfPoint(meteor, base)
      }))
    .sort( (l, r) => l.angle === r.angle
                        ? distanceFromBase(l.meteor) - distanceFromBase(r.meteor)
                        : l.angle - r.angle )

  // meteors.forEach( (m, i) => console.log(i, m))

  let lastMeteor = null
  for ( let count = 0
          , i = 0
      ; count < meteors.length
      ; i++)
  {
    if (i >= meteors.length) i = 0, lastMeteor = null
    if (meteors[i].visited) continue
    if (lastMeteor && meteors[i].angle === lastMeteor.angle) continue

    lastMeteor = meteors[i]
    lastMeteor.visited = true
    count++
    console.log(count, lastMeteor)
  }

  return JSON.stringify(lastMeteor)
}