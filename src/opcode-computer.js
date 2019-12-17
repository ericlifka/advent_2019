import { parseInteger } from "./converters.js"

export const loadProgram = (instructions, input) => (
  { ip: 0
  , instructions: instructions.slice(0)
  , callbackMode: false
  , input: input.slice(0)
  , output: [ ]
  , halt: false
  , waiting: false
  , relativeBase: 0
  })

export const loadCallbackProgram = (instructions, inputCb, outputCb) => (
  { ip: 0
  , instructions: instructions.slice(0)
  , callbackMode: true
  , input: inputCb
  , output: outputCb
  , halt: false
  , waiting: false
  , relativeBase: 0
  })

export function stepProgram(program) {
  let [ modes, opcode ] = parseInstruction(program.instructions[program.ip])

  if (opcode === 99) program.halt = true

  else if (opcode === 1) // add
    mathInstruction(program, modes, (left, right) => left + right)

  else if (opcode === 2) // multiply
    mathInstruction(program, modes, (left, right) => left * right)

  else if (opcode === 3) // input
    inputInstruction(program, modes)

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

  else if (opcode === 9) // adjust-relative-base
    adjustRelativeBaseInstruction(program, modes)

  else throw `Program encountered opcode it couldn't run ${opcode}`
}

function mathInstruction(program, modes, fn) {
  let [ param1, param2, address ] = loadParams(program, modes, 2, 1)
  program.instructions[address] = fn(param1, param2)
  program.ip += 4
}

function inputInstruction(program, modes) {
  let [ address ] = loadParams(program, modes, 0, 1)

  if (!program.callbackMode && program.input.length <= 0) {
    program.waiting = true
    return
  }

  program.ip += 2
  program.waiting = false
  program.instructions[address] =
    program.callbackMode
      ? program.input()
      : program.input.shift()
}

function outputInstruction(program, modes) {
  let [ param ] = loadParams(program, modes, 1, 0)
  program.ip += 2

  program.callbackMode
    ? program.output(param)
    : program.output.push(param)
}

function jumpInstruction(program, modes, fn) {
  let [ testVal, target ] = loadParams(program, modes, 2, 0)
  program.ip =
    fn(testVal)
      ? target
      : program.ip + 3
}

function comparisonInstruction(program, modes, fn) {
  let [ leftVal, rightVal, address ] = loadParams(program, modes, 2, 1)

  program.instructions[address] =
    fn(leftVal, rightVal)
      ? 1
      : 0

  program.ip += 4
}

function adjustRelativeBaseInstruction(program, modes) {
  let [ param ] = loadParams(program, modes, 1, 0)
  program.relativeBase += param
  program.ip += 2
}

function loadParams(program, modes, paramCount, addressCount) {
  let results = [ ]
  for (let i = 0; i < paramCount; i++) {
    let mode = modes[i]
      , param = program.instructions[ program.ip + i + 1 ]

    results.push
      ( mode === 1
        ? param
      : mode === 2
        ? program.instructions[ param + program.relativeBase ] || 0
        : program.instructions[ param ] || 0 )
  }
  for (let i = 0; i < addressCount; i++) {
    let mode = modes[ i + paramCount ]
      , address = program.instructions[ program.ip + paramCount + 1 + i ]

    results.push
      ( mode === 2
        ? address + program.relativeBase
        : address )
  }
  return results
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

export function runProgram(instructions, input = []) {
  let program = loadProgram(instructions, input)

  while (!program.halt && !program.waiting)
    stepProgram(program)

  return program.output
}