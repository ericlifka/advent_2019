import { getNumberArray } from "./input-helpers.js"
import { loadCallbackProgram, stepProgram } from "./opcode-computer.js"

let instructions = getNumberArray('11')

const abstractGrid = () => ({})
    , getPoint = (grid, {x, y}) => grid[ `${x}.${y}` ]
    , setPoint = (grid, {x, y}, val) => grid[ `${x}.${y}` ] = val
    , directions =
      [ { x: 0, y: 1 } // up
      , { x: 1, y: 0 } // right
      , { x: 0, y: -1 } // down
      , { x: -1, y: 0 } // left
      ]
    , turnRight = direction => (direction + 1) % directions.length
    , turnLeft = direction => direction - 1 < 0
                                ? directions.length - 1
                                : direction - 1

export const day11part1 = () => {
  let hull = abstractGrid()
    , position = { x: 0, y: 0 }
    , direction = 0
    , outputBuffer = [ ]

  function onInput() {
    return getPoint(hull, position) ? 1 : 0
  }

  function onOutput(output) {
    outputBuffer.push(output)

    if (outputBuffer.length === 2) {
      let [ paint, turn ] = outputBuffer

      setPoint(hull, position, !!paint)
      direction = turn === 0
                    ? turnLeft(direction)
                    : turnRight(direction)
      position.x += directions[direction].x
      position.y += directions[direction].y

      outputBuffer = [ ]
    }
  }

  let program = loadCallbackProgram(instructions, onInput, onOutput)

  while (!program.halt)
    stepProgram(program)

  return Object.keys(hull).length
}

export const day11part2 = () => {

}
