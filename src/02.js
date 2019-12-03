import { getLines } from './input-helpers.js'
import { parseInteger } from './converters.js'

let program = getLines('02')[ 0 ]
                .split(',')
                .map(parseInteger)
  , cloneProgram = () => program.slice(0)

export const day02part1 = (p = cloneProgram()) => {
  p[ 1 ] = 12
  p[ 2 ] = 2

  let cur = 0
  while (true) {
    let [ op, mem1, mem2, res ] = p.slice(cur, cur + 4)

    if ( op === 1 ) {
      p[ res ] = p[ mem1 ] + p[ mem2 ]
    }
    if ( op === 2 ) {
      p[ res ] = p[ mem1 ] * p[ mem2 ]
    }
    if ( op === 99 ) {
      break
    }

    cur += 4
  }

  return p[ 0 ]
}