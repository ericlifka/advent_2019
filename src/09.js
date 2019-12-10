import { getNumberArray } from "./input-helpers.js"
import { runProgram } from "./opcode-computer.js"

let program = getNumberArray('09')

export const day09part1 = () =>
  runProgram(program, [ 1 ])

export const day09part2 = () =>
  runProgram(program, [ 2 ])