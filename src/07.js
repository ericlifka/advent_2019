import { getNumberArray } from "./input-helpers.js"
import { runProgram, loadProgram, stepProgram } from "./opcode-computer.js"
import { permutations } from "./permutations.js"
import { descending } from "./converters.js"

let program = getNumberArray('07')

const testSequence = (sequence, amplifierInput = 0) =>
  sequence.length === 0
    ? amplifierInput
    : testSequence(sequence, runProgram(program, [ sequence.shift(), amplifierInput ])[ 0 ])

const testLoopingSequence = (sequence) => {
  let amplifiers = sequence.map( phaseSetting => loadProgram(program, [ phaseSetting ]))
    , firstAmp = amplifiers[ 0 ]
    , lastAmp = amplifiers[ amplifiers.length - 1 ]

  firstAmp.input.push(0)
  for (let i = 0; i < amplifiers.length; i++)
    amplifiers[i].output = amplifiers[ (i + 1) % amplifiers.length ].input

  while (!lastAmp.halt)
    for (let amp of amplifiers)
      do
        stepProgram(amp)
      while (!amp.waiting && !amp.halt)

  return lastAmp.output[ 0 ]
}

export const day07part1 = () =>
  permutations([0, 1, 2, 3, 4])
    .map( sequence => testSequence(sequence) )
    .sort(descending)[ 0 ]

export const day07part2 = () =>
  permutations([5, 6, 7, 8, 9])
    .map( sequence => testLoopingSequence(sequence) )
    .sort(descending)[ 0 ]
