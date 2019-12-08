import { parseInteger } from "./converters.js"

export const loadProgram = (instructions, input) => (
  { ip: 0
  , instructions: instructions.slice(0)
  , input: input.slice(0)
  , output: [ ]
  , halt: false
  , waiting: false
  })

export function stepProgram(program) {
  let [ modes, opcode ] = parseInstruction(program.instructions[program.ip])

  if (opcode === 99) program.halt = true

  else if (opcode === 1) // add
    mathInstruction(program, modes, (left, right) => left + right)

  else if (opcode === 2) // multiply
    mathInstruction(program, modes, (left, right) => left * right)

  else if (opcode === 3) // input
    inputInstruction(program)

  else if (opcode === 4) // output
    outputInstruction(program, modes)

  else if (opcode === 5) // jump-if-true
    jumpInstruction(program, modes, val => val !== 0)

  else if (opcode === 6) // jump-if-false
    jumpInstruction(program, modes, val => val === 0)

  else if (opcode === 7) // less-than
    comparisonInstruction(program, modes, (left, right) => left < right)

  else if (opcode === 8) // equal-to
    comparisonInstruction(program, modes, (left, right) => left === right)

  else throw `Program encountered opcode it couldn't run ${opcode}`
}

function mathInstruction(program, modes, fn) {
  let [ param1, param2 ] = loadParams(program, 2, modes)
  let address = program.instructions[ program.ip + 3 ]
  program.instructions[address] = fn(param1, param2)
  program.ip += 4
}

function inputInstruction(program) {
  if (program.input.length <= 0) {
    program.waiting = true
  } else {
    let input = program.input.shift()
      , address = program.instructions[ program.ip + 1 ]

    program.instructions[address] = input
    program.ip += 2
    program.waiting = false
  }
}

function outputInstruction(program, modes) {
  let [ param ] = loadParams(program, 1, modes)
  program.output.push(param)
  program.ip += 2
}

function jumpInstruction(program, modes, fn) {
  let [ testVal, target ] = loadParams(program, 2, modes)
  if (fn(testVal))
    program.ip = target
  else
    program.ip += 3
}

function comparisonInstruction(program, modes, fn) {
  let [ leftVal, rightVal ] = loadParams(program, 2, modes)
  let address = program.instructions[ program.ip + 3 ]

  program.instructions[address] =
    fn(leftVal, rightVal)
      ? 1
      : 0

  program.ip += 4
}

function loadParams(program, count, modes) {
  let params = [ ]
  for (let i = 0; i < count; i++) {
    let mode = modes[i]
      , param = program.instructions[ program.ip + i + 1 ]

    params.push(
      mode === 1
        ? param
        : program.instructions[param])
  }
  return params
}

function parseInstruction(instruction) {
  let opcode = instruction % 100
  let modes =
  `${Math.floor(instruction / 100)}`
    .padStart(3, '0')
    .split('')
    .map(parseInteger)
    .reverse()

  return [ modes, opcode ]
}

export function runProgram(instructions, input) {
  let program = loadProgram(instructions, input)

  while (!program.halt && !program.waiting)
    stepProgram(program)

  return program.output
}