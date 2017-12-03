const Grid = class {
  constructor() {
    this.data = []
    this.pointerRow = 0
    this.pointerCol = 0
    this.pointerDirection = 0
    this.directions = [
      {
        row: 0,
        col: 1
      },
      {
        row: -1,
        col: 0
      },
      {
        row: 0,
        col: -1
      },
      {
        row: 1,
        col: 0
      }
    ]
    this.steps = -1
    this.changeDirectionAt = 1
    this.stepsPerDirection = 1
  }
  get(row, col) {
    let rowData = this.data[row]
    return rowData[col]
  }
  getPosition(value) {
    for (let rowIndex = this.pointerRow; rowIndex < this.data.length; rowIndex++) {
      const row = this.data[rowIndex]
      for (let colIndex = this.pointerCol; colIndex < row.length; colIndex++) {
        if (row[colIndex] === value) {
          return {
            col: colIndex,
            row: rowIndex
          }
        }
      }
    }
  }
  addNext(value) {
    let row = this.pointerRow
    let col = this.pointerCol
    let rowData = this.data[row] || (this.data[row] = [])
    if (rowData[col]) {
      console.log(`rowData[col] is already set: ${rowData[col]}`);
    }
    rowData[col] = value

    // Does the direction need to change?
    this.steps++
    if (this.steps === this.changeDirectionAt) {
      this.pointerDirection = (this.pointerDirection + 1) % this.directions.length

      this.changeDirectionAt = this.changeDirectionAt + this.stepsPerDirection
      // After direction changes where col changes, we up stepsPerDirection
      if (this.pointerDirection % 2) {
        this.stepsPerDirection++
      }
    }
    
    // Move
    let dir = this.directions[this.pointerDirection]
    this.pointerRow += dir.row
    this.pointerCol += dir.col
  }
}

let grid = new Grid
let value = 1

let target = 347991
while (value <= target) {
  grid.addNext(value)
  value++
}

// console.log(grid.get(0, 0) === 1)
// console.log(grid.get(0, 1) === 2)
// console.log(grid.get(-1, 1) === 3)
// console.log(grid.get(-1, 0) === 4)
// console.log(grid.get(-1, -1) === 5)
// console.log(grid.get(0, -1) === 6)

// console.log(grid.get(1, 2) === 10)

const at = grid.getPosition(target)
const distance = Math.abs(at.row) + Math.abs(at.col)
console.log(distance)

// 2
const Grid2 = class {
  constructor() {
    this.data = []
    this.pointerRow = 0
    this.pointerCol = 0
    this.pointerDirection = 0
    this.directions = [
      {
        row: 0,
        col: 1
      },
      {
        row: -1,
        col: 0
      },
      {
        row: 0,
        col: -1
      },
      {
        row: 1,
        col: 0
      }
    ]
    this.steps = -1
    this.changeDirectionAt = 1
    this.stepsPerDirection = 1
  }
  get(row, col) {
    let rowData = this.data[row]
    return rowData && rowData[col] ? rowData[col] : 0
  }
  getPosition(value) {
    for (let rowIndex = this.pointerRow; rowIndex < this.data.length; rowIndex++) {
      const row = this.data[rowIndex]
      for (let colIndex = this.pointerCol; colIndex < row.length; colIndex++) {
        if (row[colIndex] === value) {
          return {
            col: colIndex,
            row: rowIndex
          }
        }
      }
    }
  }
  addNext(initial) {
    let row = this.pointerRow
    let col = this.pointerCol
    let rowData = this.data[row] || (this.data[row] = [])

    let value
    if (initial) {
      value = 1
    }
    else {
      value = [
        this.get(row, col - 1),
        this.get(row, col),
        this.get(row, col + 1),

        this.get(row - 1, col - 1),
        this.get(row - 1, col),
        this.get(row - 1, col + 1),

        this.get(row + 1, col - 1),
        this.get(row + 1, col),
        this.get(row + 1, col + 1)
      ].reduce((acc, curr) => acc + curr, 0)
    }

    rowData[col] = value
    this.lastValue = value

    // Does the direction need to change?
    this.steps++
    if (this.steps === this.changeDirectionAt) {
      this.pointerDirection = (this.pointerDirection + 1) % this.directions.length

      this.changeDirectionAt = this.changeDirectionAt + this.stepsPerDirection
      // After direction changes where col changes, we up stepsPerDirection
      if (this.pointerDirection % 2) {
        this.stepsPerDirection++
      }
    }

    // Move
    let dir = this.directions[this.pointerDirection]
    this.pointerRow += dir.row
    this.pointerCol += dir.col

    return value
  }
}

let grid2 = new Grid2
const initial = true
grid2.addNext(initial)

// let target = 347991 // Same as in .1
while (grid2.addNext() < target) {
}
console.log(grid2.lastValue)
