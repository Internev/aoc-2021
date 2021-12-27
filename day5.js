const fs = require('fs')

const points = fs.readFileSync('./005-input.txt', 'utf8')
  .split('\r\n')
  .map(row => row.split(' -> ').map(p => p.split(',').map(Number)))

// const test = [
//   [ [ 70, 96 ], [ 70, 46 ] ],
//   [ [ 80, 70 ], [ 67, 70 ] ],
// ]

// const p1 = points.filter(row => {
//   const [ [ x1, y1 ], [ x2, y2 ] ] = row
//   return x1 === x2 || y1 === y2
// })

// const field = Array(1000).fill(0).map(() => Array(1000).fill(0))

// p1.forEach(row => {
//   const [ [ x1, y1 ], [ x2, y2 ] ] = row
//   const [ xLow, yLow ] = [ Math.min(x1, x2), Math.min(y1, y2) ]
//   const [ xHigh, yHigh ] = [ Math.max(x1, x2), Math.max(y1, y2) ]
//   for (let x = xLow; x <= xHigh; x++) {
//     for (let y = yLow; y <= yHigh; y++) {
//       field[x][y] += 1
//     }
//   }
// })

// const p1Result = field.reduce((acc, r) => {
//   return acc + r.filter(v => v > 1).length
// }, 0)

// console.log(p1Result)

const test = [
  [ [ 348,742 ], [ 620,742 ] ],
  [ [ 494,864 ], [ 494,484 ] ],
  [ [ 72,964 ], [ 847,189 ] ],
]

const field = Array(1000).fill(0).map(() => Array(1000).fill(0))

points.forEach(row => {
  const [ [ x1, y1 ], [ x2, y2 ] ] = row
  const distance = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))
  const xDirection = x1 < x2 ? 1 : -1
  const yDirection = y1 < y2 ? 1 : -1
  let x = x1
  let y = y1
  for (let i = 0; i <= distance; i++) {
    field[y][x] += 1
    x = x === x2 ? x : x + xDirection
    y = y === y2 ? y : y + yDirection
  }
})

const p2Result = field.reduce((acc, r) => {
  return acc + r.filter(v => v > 1).length
}, 0)

console.log('p2Result', p2Result)

fs.writeFileSync('./005-output.txt', field.map(r => r.join('')).join('\n'))

// 348,742 -> 620,742 = col at 742 (348 - 620)
// 494,864 -> 494,484 = (864 - 494) row at 494 
// 193,136 -> 301,136 = col at 136 (193 - 301)
// 342,692 -> 342,538 = (692 - 538) row at 342
// 234,525 -> 102,393 = (234 - 102)(525 - 393)
// 72,964 -> 847,189  = (72 - 847) (964 - 189)
//                       