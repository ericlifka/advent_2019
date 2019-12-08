import { getLines } from './input-helpers.js'
import { reduceCountOccurance } from './converters.js'

let input = getLines('08')[ 0 ].split('')

const chunkData = (size, data) =>
  data.length <= 0
    ? [ ]
    : [ data.slice(0, size), ...chunkData(size, data.slice(size)) ]

export const day08part1 = () => {
  let layers = chunkData(25 * 6, input.slice())
    , countZero = reduceCountOccurance('0')
    , countOne = reduceCountOccurance('1')
    , countTwo = reduceCountOccurance('2')
    , compareLayers = (least, cur) =>
                        least.reduce(countZero, 0) < cur.reduce(countZero, 0)
                          ? least
                          : cur
    , minLayer = layers.reduce(compareLayers, layers[0])

  return minLayer.reduce(countOne, 0) * minLayer.reduce(countTwo, 0)
}

export const day08part2 = () => {
  let layers = chunkData(25 * 6, input.slice())
    , pixelReducer = (i) => (rendered, layer) =>
                              rendered === '2'
                                ? layer[i]
                                : rendered
    , image = layers[0].map( (_, i) => layers.reduce(pixelReducer(i), '2'))
    , rows = chunkData(25, image)
    , renderChars =
      { '1': '[]'
      , '0': '  '
      }

  return "\n" + rows.map( row => row.map( i => renderChars[i] ).join('') ).join('\n')
}