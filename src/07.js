import { getNumberArray } from "./input-helpers.js"
import { runProgram } from "./opcode-computer.js"
import { permutations } from "./permutations.js"
import { descending } from "./converters.js"

let program = getNumberArray('07')

const testSequence = (sequence, amplifierInput = 0) =>
  sequence.length === 0
    ? amplifierInput
    : testSequence(sequence, runProgram(program, [ sequence.shift(), amplifierInput ])[ 0 ])


export const day07part1 = () =>
  permutations([0, 1, 2, 3, 4])
    .map( sequence => testSequence(sequence) )
    .sort(descending)[ 0 ]

export const day07part2 = () => null