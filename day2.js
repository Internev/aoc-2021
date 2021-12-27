const fs = require('fs')

// Part 1
// const directions = fs.readFileSync('./src/002-input.txt', 'utf8')
//   .split(/\r\n/)
//   .map(line => line.split(/\s/))
//   .reduce((acc, line) => {
//     const [direction, amount] = line
//     acc[direction] += Number(amount)
//     return acc
//   }, {forward: 0, down: 0, up: 0})
// { forward: 1957, down: 2022, up: 1067 }
// directions 1957 955
// directions 1868935

// Part 2
const directions = fs.readFileSync('./src/002-input.txt', 'utf8')
  .split(/\r\n/)
  .map(line => line.split(/\s/))
  .reduce((acc, line) => {
    const [direction, amount] = line
    switch (direction) {
      case 'up': {
        const newAim = acc.aim - Number(amount)
        acc.aim = newAim
        return acc
      }
      case 'down': {
        const newAim = acc.aim + Number(amount)
        acc.aim = newAim
        return acc
      }
      case 'forward':
        acc.forward += Number(amount)
        acc.depth += Number(amount) * acc.aim
        return acc
    }
    // console.log('direction', direction, 'amount', amount, 'aim', acc.aim)
    return acc
  }, {forward: 0, aim: 0, depth: 0})

console.log('directions', directions.forward * directions.depth)
