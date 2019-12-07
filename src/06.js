import { getLines } from './input-helpers.js'
import { splitter } from './converters.js'

let links =
getLines('06')
  .map(splitter(')'))

function countOrbits(node) {
  let count = 0
  while (node.parent) {
    node = node.parent
    ++count
  }
  return count
}

export const day06part1 = () => {
  let nodes = { }
  console.log(JSON.stringify(links))

  links.forEach( ([parent, child]) => {
    if (!nodes[parent])
      nodes[parent] = { node: parent }

    if (!nodes[child])
      nodes[child] = { node: child }
  })

  links.forEach( ([parent, child]) =>
    nodes[child].parent = nodes[parent])

  let orbits = Object.keys(nodes).map( name => ({ name, count: countOrbits(nodes[name])}))
  console.log(JSON.stringify(orbits))
  return orbits.reduce((sum, cur) => sum + cur.count, 0)
}

export const day06part2 = () => null