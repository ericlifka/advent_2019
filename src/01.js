import { getLines } from './input-helpers.js'
import { parseInteger } from './conversions.js'

const data =
getLines('01')
  .map(parseInteger)

export const day01part1 = () => data
  .map(weight => Math.floor(weight / 3) - 2)
  .reduce((prev, cur) => prev + cur, 0)

export const day01part2 = () => data
  .map(getFuel)
  .reduce((prev, cur) => prev + cur, 0)

function getFuel(weight) {
  let fuel = Math.floor(weight / 3) - 2
  if (fuel <= 0) {
    return 0;
  } else {
    return fuel + getFuel(fuel)
  }
}