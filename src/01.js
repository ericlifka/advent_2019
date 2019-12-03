import { getLines } from './input-helpers.js'
import { parseInteger, reduceSum } from './converters.js'

const simpleFuel = weight => Math.floor(weight / 3 ) - 2

const calcFuel = (weight, fuel = simpleFuel(weight)) =>
  fuel <= 0
    ? 0
    : fuel + calcFuel(fuel)

const data = getLines('01')
  .map(parseInteger)

export const day01part1 = () => data
  .map(simpleFuel)
  .reduce(reduceSum, 0)

export const day01part2 = () => data
  .map(weight => calcFuel(weight))
  .reduce(reduceSum, 0)
