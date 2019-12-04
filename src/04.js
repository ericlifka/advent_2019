import { getLine } from "./input-helpers.js"
import { parseInteger } from "./converters.js"

let [ min, max ] = getLine('04').split('-').map(parseInteger)

const pairRuleSimple = (digits, i) => digits[i] == digits[i + 1]
    , pairRuleComplex = (digits, i) => digits[i] == digits[i + 1]
                                    && digits[i] != digits[i - 1]
                                    && digits[i + 1] != digits[i + 2]

const passRules = (num, pairRule) => {
  let hasPair = false
    , digits = `${num}`.split('').map(parseInteger)

  for (let i = 0; i < digits.length - 1; i++)
    if (pairRule(digits, i))
      hasPair = true
    else if (digits[i] > digits[i + 1])
      return false

  return hasPair
}

const testNumbers = (pairRule) => {
  let counter = 0

  for (let i = min; i <= max; i++)
    if (passRules(i, pairRule))
      ++counter

  return counter
}

export const day04part1 = () => testNumbers(pairRuleSimple)
export const day04part2 = () => testNumbers(pairRuleComplex)
