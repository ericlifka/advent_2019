import { parseInteger, ascending } from "./converters.js"
import { getLines } from "./input-helpers.js"

let input = getLines('03')
  .map(line => line
    .split(',')
    .map(instruction => (
      { direction: instruction[0]
      , distance: parseInteger(instruction.slice(1))})))

const abstractGrid = () => ({})
    , getPoint = (grid, x, y) => grid[ `${x}.${y}` ]
    , setPoint = (grid, x, y, val) => grid[ `${x}.${y}` ] = val
    , manhattan = ({x, y}) => Math.abs(x) + Math.abs(y)
    , directionVector = direction =>
        direction === "R" ? [ 1, 0 ] :
        direction === "L" ? [ -1, 0 ] :
        direction === "U" ? [ 0, 1 ] :
        direction === "D" ? [ 0, -1 ] :
          [ 0, 0 ]
    , traversePath = (path, cb) => {
        let x = 0, y = 0
        path.forEach(({direction, distance}) => {
          let [ dx, dy ] = directionVector(direction)
          for (let i = 0; i < distance; i++)
            cb(x+=dx, y+=dy)
        })
      }

export const day03part1 = () => {
  let grid = abstractGrid()
    , collisions = [ ]

  traversePath(input[0], (x, y) => {
    setPoint(grid, x, y, true)
  })

  traversePath(input[1], (x, y) => {
    if (getPoint(grid, x, y)) {
      collisions.push(manhattan({x, y}))
    }
  })

  return collisions.reduce((min, cur) =>
    (cur < min)
      ? cur
      : min, Infinity)
}

export const day03part2 = () => {
  let grid = abstractGrid()
    , collisions = [ ]
    , counter1 = 0
    , counter2 = 0

  traversePath(input[0], (x, y) => {
    ++counter1
    if (!getPoint(grid, x, y)) {
      setPoint(grid, x, y, counter1)
    }
  })

  traversePath(input[1], (x, y) => {
    ++counter2
    let firstWire = getPoint(grid, x, y)
    if (firstWire) {
      collisions.push(firstWire + counter2)
    }
  })

  collisions.sort(ascending)
  return collisions[0]
}