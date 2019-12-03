import { getLines } from './input-helpers.js'
import { parseInteger } from './conversions.js'

function getFuel(weight) {
  let fuel = Math.floor(weight / 3) - 2
  if (fuel <= 0) {
    return 0;
  } else {
    return fuel + getFuel(fuel)
  }
}

let data1 = getLines('01')
  .map(parseInteger)
  .map(i => Math.floor(i / 3) - 2)
  .reduce((prev, cur) => prev + cur, 0)

console.log(data1)

let data2 = getLines('01')
  .map(parseInteger)
  .map(i => getFuel(i))
  .reduce((prev, cur) => prev + cur, 0)

console.log(data2)
