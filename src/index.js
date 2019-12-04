import { timeFunc } from "./time-func.js"
import { day01part1, day01part2 } from "./01.js"
import { day02part1, day02part2 } from "./02.js"
import { day03part1, day03part2 } from "./03.js"

const solutions =
{ '011': day01part1, '012': day01part2
, '021': day02part1, '022': day02part2
, '031': day03part1, '032': day03part2
}

let day = process.argv[ 2 ]
  , part1 = solutions[ `${day}1` ]
  , part2 = solutions[ `${day}2` ]
  , time
  , result

if (part1) {
  time = timeFunc(() => result = part1())
  console.log(`Part 1:\n  solution: ${result}\n  time: ${time} ms\n`);
}
if (part2) {
  time = timeFunc(() => result = part2())
  console.log(`Part 2:\n  solution: ${result}\n  time: ${time} ms\n`);
}
