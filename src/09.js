import { getNumberArray } from "./input-helpers.js"
import { runProgram } from "./opcode-computer.js"

let program = getNumberArray('09')

export const day09part1 = () => JSON.stringify(
  runProgram(program, [ 1 ]) )

export const day09part2 = () => null