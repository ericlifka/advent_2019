import { getLines } from './input-helpers.js'
import { parseInteger } from './conversions.js'

let data = getLines('01')
  .map(parseInteger)
  .map(i => Math.floor(i / 3) - 2)
  .reduce((prev, cur) => prev + cur, 0);

console.log(data)