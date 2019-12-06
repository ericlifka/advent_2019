import { parseInteger } from "./converters.js"

const loadProgram = (instructions, input) => (
  { ip: 0
  , instructions: instructions.slice(0)
  , input: input.slice(0)
  , output: [ ]
  , halt: false
  })

function stepProgram(program) {
  let [ modes, opcode ] = parseInstruction(program.instructions[program.ip])

  if (opcode === 99) program.halt = true

  else if (opcode === 1) mathInstruction(program, modes, (a, b) => a + b)

  else if (opcode === 2) mathInstruction(program, modes, (a, b) => a * b)

  else if (opcode === 3) {
    let input = program.input.shift()
    if (!input) throw "Program requested input when input buffer was empty"
    let address = program.instructions[ program.ip + 1 ]
    program.instructions[address] = input
    program.ip += 2
  }

  else if (opcode === 4) {
    let [ param ] = loadParams(program, 1, modes)
    program.output.push(param)
    program.ip += 2
  }

  else throw `Program encountered opcode it couldn't run ${opcode}`
}

function mathInstruction(program, modes, fn) {
  let [ param1, param2 ] = loadParams(program, 2, modes)
  let address = program.instructions[ program.ip + 3 ]
  program.instructions[address] = fn(param1, param2)
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

  while (!program.halt)
    stepProgram(program)

  return program.output
}