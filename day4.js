const fs = require('fs')

const input = fs.readFileSync('004-input.txt', 'utf8').split('\r\n')

const calledNumbers = input.shift().split(',')

const boards = input.reduce((acc, curr) => {
  if (curr.length === 0) {
    //return a new board
    acc.push([])
  } else {
    acc[acc.length-1].push(curr.split(/\s+/).filter(n => n.length > 0))
  }
  return acc
}, [])

const winningBoards = {}
const winningBoardOrder = []

const calcWin = (number, board) => {
  const boardTotal = board.reduce((acc, row) => {
    const rowTotal = row.reduce((rowAcc, n) => {
      if (n === 'X') {
        return rowAcc
      }
      const num = parseInt(n)
      return rowAcc + num
    }, 0)
    return acc + rowTotal
  }, 0)
  console.log('board total:', boardTotal)
  console.log('final number:', number * boardTotal)
}

const checkWin = (number, board, boardIndex) => {
  if (winningBoards[boardIndex]) { return }
  console.log('length', Object.keys(winningBoards).length, boards.length)
  if (Object.keys(winningBoards).length === boards.length) {
    console.log('\n\n FINAL winning board:', board, number)
    calcWin(number, board)
  }
  const rowComplete = board.find(row => row.every(n => n === 'X')) 
  if (rowComplete && !winningBoards[boardIndex]) {
    winningBoards[boardIndex] = {board, number}
    winningBoardOrder.push(boardIndex)
    // calcWin(number, board)
  }
  const colComplete = board[0].map((_, i) => board.every(row => row[i] === 'X'))
  if (colComplete.some(n => n === true) && !winningBoards[boardIndex]) {
    winningBoards[boardIndex] = {board, number}
    winningBoardOrder.push(boardIndex)
    // calcWin(number, board)
  }
}

const markBoard = (number, board, boardIndex) => {
  if (winningBoards[boardIndex]) { return }
  board.forEach(row => {
    const i = row.findIndex(n => n === number)
    if (i > -1) {
      row[i] = 'X'
    }
  })
  checkWin(number, board, boardIndex)
}

calledNumbers.forEach(number => {
  boards.forEach((board, boardIndex) => {
    markBoard(number, board, boardIndex)
  })
})

const winningBoard = winningBoards[winningBoardOrder.pop()]
calcWin(winningBoard.number, winningBoard.board)