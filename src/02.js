import { getLines } from './input-helpers.js'
import { parseInteger } from './converters.js'

let program = getLines('02')[ 0 ]
                .split(',')
                .map(parseInteger)
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