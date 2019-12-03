import { day01part1, day01part2 } from "./01.js"

const solutions =
{ '011': () => day01part1()
, '012': () => day01part2()
}

let day = process.argv[ 2 ]
let part1 = solutions[ `${day}1` ]
let part2 = solutions[ `${day}2` ]

if (part1) {
  console.log(part1())
}
if (part2) {
  console.log(part2())
}
