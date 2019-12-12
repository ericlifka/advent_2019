import { timeFunc } from "./time-func.js"
import { day01part1, day01part2 } from "./01.js"
import { day02part1, day02part2 } from "./02.js"
import { day03part1, day03part2 } from "./03.js"
import { day04part1, day04part2 } from "./04.js"
import { day05part1, day05part2 } from "./05.js"
import { day06part1, day06part2 } from "./06.js"
import { day07part1, day07part2 } from "./07.js"
import { day08part1, day08part2 } from "./08.js"
import { day09part1, day09part2 } from "./09.js"
import { day10part1, day10part2 } from "./10.js"

const solutions =
{ '011': day01part1, '012': day01part2
, '021': day02part1, '022': day02part2
, '031': day03part1, '032': day03part2
, '041': day04part1, '042': day04part2
, '051': day05part1, '052': day05part2
, '061': day06part1, '062': day06part2
, '071': day07part1, '072': day07part2
, '081': day08part1, '082': day08part2
, '091': day09part1, '092': day09part2
, '101': day10part1, '102': day10part2
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
