import { reduceSum } from "./converters.js"

let moons =
  [ [ 17,  -12,  13 ]
  , [  2,    1,   1 ]
  , [ -1,  -17,   7 ]
  , [ 12,  -14,  18 ]
  ]
  // [ [ -1, 0, 2]
  // , [ 2, -10, -7]
  // , [ 4, -8, 8]
  // , [ 3, 5, -1]
  // ]
  .map( ([ x, y, z ]) => (
    { position: { x: x, y: y, z: z }
    , velocity: { x: 0, y: 0, z: 0 }
    }))

const vadd = (v1, v2) => (
  { x: v1.x + v2.x
  , y: v1.y + v2.y
  , z: v1.z + v2.z
  })

const venergy = ({x, y, z}) =>
  Math.abs(x) + Math.abs(y) + Math.abs(z)

const velocityStep = (val1, val2) => val1 == val2 ? 0
                                   : val1 < val2 ? 1
                                   : -1

function gravityVector(moon, moons) {
  let vector = { x: 0, y: 0, z: 0 }
  moons.forEach( other => {
    vector.x += velocityStep(moon.position.x, other.position.x)
    vector.y += velocityStep(moon.position.y, other.position.y)
    vector.z += velocityStep(moon.position.z, other.position.z)
  })
  return vector
}

function runStep(moons) {
  moons.forEach( moon => {
    moon.update = gravityVector(moon, moons)
  })
  moons.forEach( moon => {
    moon.velocity = vadd(moon.velocity, moon.update)
  })
  moons.forEach( moon => {
    moon.position = vadd(moon.position, moon.velocity)
  })
}

export const day12part1 = () => {
  // console.log('after 0 steps:')
  // moons.forEach( moon => console.log(moon.position, moon.velocity))
  // console.log('\n')

  for (let i = 1; i <= 1000; i++) {
    runStep(moons)

    // console.log(`after ${i} steps:`)
    // moons.forEach( moon => console.log(moon.position, moon.velocity))
    // console.log('\n')
  }

  return moons
    .map( ({position, velocity}) => venergy(position) * venergy(velocity) )
    .reduce(reduceSum)
}

export const day12part2 = () => null
