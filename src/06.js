import { getLines } from './input-helpers.js'
import { splitter } from './converters.js'

let links =
getLines('06')
  .map(splitter(')'))

const countOrbits = (node, count = 0) =>
  !node.parent ? count
               : countOrbits(node.parent, count + 1)

export const day06part1 = () => {
  let nodes = { }

  links.forEach( ([parent, child]) => {
    if (!nodes[parent])
      nodes[parent] = { node: parent }

    if (!nodes[child])
      nodes[child] = { node: child }
  })

  links.forEach( ([parent, child]) =>
    nodes[child].parent = nodes[parent])

  let orbits = Object.keys(nodes).map( name =>
    countOrbits(nodes[name]))

  return orbits.reduce((sum, cur) =>
    sum + cur
  , 0)
}

export const day06part2 = () => null