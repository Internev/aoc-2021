// const ctest = `11111
// 19991
// 19191
// 19991
// 11111`

// const octoMap = ctest.split('\n').map(line => line.split('').map(Number))
const fs = require('fs')
const prettyPrint = (omap) => omap.map(row => row.join('')).join('\n')

const octoMap = fs.readFileSync('011-input.txt', 'utf8')
  .split(/\r\n/).map(line => line.split('').map(Number))


const neighbours = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]

let flashCount = 0
const octoJazzStack = []

const jazzOctos = ([x, y]) => {
  if (octoMap[y][x] < 10) {
    return
  }
  neighbours.forEach(([dx, dy]) => {
    let point = octoMap[y + dy] && octoMap[y + dy][x + dx]
    if (point && point < 10) {
      // console.log('jazzing point', point, [x + dx, y + dy], [x, y])
      point++
      octoMap[y + dy][x + dx] = point
      if (point > 9) {
        jazzOctos([x + dx, y + dy])
      }
    }
  })
}

const boostOctos = () => {
  octoMap.forEach((row, y) => {
    row.forEach((_, x) => {
      octoMap[y][x]++
      if (octoMap[y][x] > 9) {
        octoJazzStack.push([x, y])
      }
    })
  })
}

const calmOctos = () => {
  octoMap.forEach((row, y) => {
    row.forEach((_, x) => {
      if (octoMap[y][x] > 9) {
        octoMap[y][x] = 0
        flashCount++
      }
    })
  })
}

const syncFlash = () => {
  return octoMap.reduce((acc, row) => 
    {
      if (!acc) { return acc}
      return row.every(n => n === 0)
    }, true)
}

for (let i = 1; i < 2000; i++) {
  boostOctos()
  while (octoJazzStack.length) {
    const [x, y] = octoJazzStack.pop()
    jazzOctos([x, y])
  }
  calmOctos()
  if (syncFlash()) {
    console.log('sync flash', i, flashCount)
    break
  }
  // console.log(`Round ${i}:\n${prettyPrint(octoMap)}`)
}
// boostOctos()
// checkOctos()
// calmOctos()

console.log(`octoMap\n${prettyPrint(octoMap)}\n${flashCount}`)
