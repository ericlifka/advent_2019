import { parseInteger } from "./converters.js"

const loadProgram = (instructions, input) => (
  { ip: 0
  , instructions: instructions.slice(0)
  , input: input.slice(0)
  , output: [ ]
  , halt: false
  })

function stepProgram(program) {
  let [ modes, opcode ] = parseInstruction(program.instructions[ program.ip ])
  let param1, param2, address, input

  switch (opcode) {
    case 99:
      program.halt = true
      break

    case 1:
      [ param1, param2 ] = loadParams(program, 2, modes)
      address = program.instructions[ program.ip + 3 ]
      program.instructions[address] = param1 + param2
      program.ip += 4
      break

    case 2:
      [ param1, param2 ] = loadParams(program, 2, modes)
      address = program.instructions[ program.ip + 3 ]
      program.instructions[address] = param1 * param2
      program.ip += 4
      break

    case 3:
      input = program.input.shift()
      if (!input) throw "Program requested input when input buffer was empty"
      address = program.instructions[ program.ip + 1 ]
      program.instructions[address] = input
      program.ip += 2
      break

    case 4:
      [ param1 ] = loadParams(program, 1, modes)
      program.output.push(param1)
      program.ip += 2
      break

    default:
      throw `Program encountered opcode it couldn't run ${opcode}`
  }
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

  while (!program.halt)
    stepProgram(program)

  return program.output
}