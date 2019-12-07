import { getLines } from './input-helpers.js'
import { reduceSum, splitter } from './converters.js'

let links = getLines('06').map(splitter(')'))
  , nodes = buildGraph()

const countOrbits = (node, count = 0) =>
  !node.parent ? count
               : countOrbits(node.parent, count + 1)

function buildGraph() {
  let nodes = { }

  links.forEach(([ parent, child ]) =>
    ( nodes[parent] = { node: parent }
    , nodes[child] = { node: child }))

  links.forEach(([ parent, child ]) =>
    nodes[child].parent = nodes[parent])

  return nodes
}

export const day06part1 = () =>
  Object
    .keys(nodes)
    .map( name => countOrbits(nodes[name]))
    .reduce(reduceSum, 0)

export const day06part2 = () => {
  let you = nodes['YOU']
    , santa = nodes['SAN']
    , youCount = 0
    , santaCount = 0

  while (you = you.parent)
    you.youCount = youCount++

  while (  !santa.youCount
        && (santa = santa.parent))
    santa.santaCount = santaCount++

  return santa.youCount + santa.santaCount
}