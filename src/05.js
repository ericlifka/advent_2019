import { runProgram } from './opcode-computer.js'
import { getNumberArray } from './input-helpers.js'

let input = getNumberArray('05')

export const day05part1 = () =>
  runProgram(input, [ 1 ])

export const day05part2 = () =>
  runProgram(input, [ 5 ])