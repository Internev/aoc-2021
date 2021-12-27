const fs = require('fs')

// FINAL ANSWER:
const scores = require('./014-20map.json')
const inputSource = fs.readFileSync('./014-20string.txt', 'utf8').split('')
const notFound = []
const inp = inputSource
  .reduce((acc, c, i) => {
    if (inputSource[i + 1]) {
      acc.push(c + inputSource[i + 1])
    }
    return acc
  }, [])
  .map(c => scores[c])

const result = inp.reduce((acc, c) => {
  for (let ch in c) {
    if (!acc[ch]) {
      acc[ch] = c[ch]
    } else {
      acc[ch] += c[ch]
    }
  }
  return acc
}, {})

console.log('result', Math.max(...Object.values(result)) - Math.min(...Object.values(result)))

// console.log('inp', inp)
// const [inputSource, templateSource] = fs.readFileSync('./014-input.txt', 'utf8')
//   .split('\r\n\r\n')



// const map20 = templateSource
//   .split('\r\n')
//   .map((row) => {
//     const [h, t] = row.split(' -> ')
//     return h
//   })
  
// const template = templateSource
//   .split('\r\n')
//   .reduce((acc, row) => {
//     const [h, t] = row.split(' -> ')
//     acc[h] = t
//     // count[t] = 0
//     return acc
//   }, {})

// const compoundProblems = (inp) => {
//   let r = ''
//   const chars = inp.split('')
//   for (let i = 0; i < chars.length; i++) {
//     const ch1 = chars[i]
//     r += ch1
//     const ch2 = chars[i + 1]
//     if (ch2) {
//       r += template[ch1 + ch2]
//     }
//   }
//   return r
// }

// let result = inputSource
// for (let i = 0; i < 20; i++) {
//   result = compoundProblems(result)
// }

// fs.writeFileSync('./014-20string.txt', result)
// // const input = inputSource.split('').reduce((acc, ch, i) => {
// //   // count[ch]++
// //   if (inputSource[i+1]) {
// //     acc.push(ch + inputSource[i+1])
// //   }
// //   return acc
// // }, [])


// const applyTemplate = (pair, count, iteration) => {
//   if (iteration < 1) return
//   const newCh = template[pair]
//   if (!count[newCh]) {
//     count[newCh] = 1
//   } else {
//     count[newCh]++
//   }
//   applyTemplate(pair[0] + template[pair], count, iteration - 1)
//   applyTemplate(template[pair] + pair[1], count, iteration - 1)
//   return
// }

// const summary20 = map20
//   .map((pair, i) => {
//     console.log(`${i+1}/${map20.length}: ${pair}`)
//     const c = {}
//     c[pair[0]] = 1
//     c[pair[1]] = 1
//     applyTemplate(pair, c, 20)
//     return [pair, c]
//   })
//   .reduce((acc, cur) => {
//     const [pair, count] = cur
//     acc[pair] = count
//     return acc
//   }, {})

// // // console.log(count)
// // // console.log('result:', Math.max(...Object.values(count)) - Math.min(...Object.values(count)))
// console.log(summary20)
// fs.writeFileSync('./014-20map.json', JSON.stringify(summary20))