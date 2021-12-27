const fs = require('fs')

const lines = fs.readFileSync('003-input.txt', 'utf8')
  .split('\r\n')

// const summary = lines
//   .reduce((acc, line) =>
//     line.split('').map((ch, i) => 
//       Number(ch) + (acc[i] || 0)
//     ), [])

// const gamma = parseInt(Number(summary.map(bit => (bit / lines.length) > 0.5 ? 1 : 0).join('')), 2)
// const epsilon = parseInt(Number(summary.map(bit => (bit / lines.length) < 0.5 ? 1 : 0).join('')), 2)

// console.log('Part 1:\ngamma:', gamma, 'epsilon:', epsilon, gamma * epsilon)

const countNPrune = (source, index, supportType) => {
  if (source[0] && index >= source[0].length || source.length === 1) {
    return source
  }
  const counts = source.reduce((acc, line) => {
    if (!acc[line[index]]) {
      acc[line[index]] = 1
    } else {
      acc[line[index]]++
    }
    return acc
  }, {})

  const filter = supportType === 'o2'
    ? Number(counts['0']) > counts['1'] ? '0' : '1'
    : Number(counts['0']) <= counts['1'] ? '0' : '1'
  
  console.log('supportType:', supportType, 'index:', index, 'filter:', filter, counts)
  return countNPrune(source.filter(line => line[index] === filter), index + 1, supportType)
}

const oxygenString = countNPrune(lines, 0, 'o2')[0]
const carbonString = countNPrune(lines, 0, 'co2')[0]

console.log('oxygenString:', oxygenString)
console.log('carbonString:', carbonString)

const oxygen = parseInt(Number(oxygenString), 2)
const carbonDioxide = parseInt(Number(carbonString), 2)

console.log('oxygen:', oxygen, 'carbonDioxide:', carbonDioxide, 'result:', oxygen * carbonDioxide)
