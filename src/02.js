import { getNumberArray } from './input-helpers.js'
import { parseInteger } from './converters.js'

let program = getNumberArray('02')
  , cloneProgram = () => program.slice(0)

function runProgram(noun, verb, p = cloneProgram()) {
  p[ 1 ] = noun
  p[ 2 ] = verb
  let c = 0

  while (true) {
    let [ op, m1, m2, res ] = p.slice(c, c + 4)

    if ( op === 1 ) {
      p[res] = p[m1] + p[m2]
      c += 4
    }

    if ( op === 2 ) {
      p[res] = p[m1] * p[m2]
      c += 4
    }

    if ( op === 99 ) {
      c += 1
      break
    }
  }

  return p[ 0 ]
}

export const day02part1 = () => runProgram(12, 2)

export const day02part2 = () => {
  for (let x = 0; x <= 99; x++) {
    for (let y = 0; y <= 99; y++) {
      if (runProgram(x, y) === 19690720) {
        return 100 * x + y
      }
    }
  }
}