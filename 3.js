const Grid = class {
  constructor() {
    this.data = []
    this.pointerRow = 0
    this.pointerCol = 0
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
    this.pointerDirection = 0
    this.directionChangeAfter = 1
    this.directionSteps = -1
    this.changeDirectionAt = 1
    this.stepsPerDirection = 1
  }
  add(row, col, value) {
    let rowData = this.data[row] || (this.data[row] = [])
    if (rowData[col]) {
      console.log(`rowData[col] is already set: ${rowData[col]}`);
    }
    rowData[col] = value
    this.valueCount++
  }
  get(row, col) {
    let rowData = this.data[row]
    return rowData[col]
  }
  addNext(value) {
    let row = this.pointerRow
    let col = this.pointerCol
    let rowData = this.data[row] || (this.data[row] = [])
    rowData[col] = value

    // Does the direction need to change?
    this.directionSteps++
    if (this.directionSteps === this.changeDirectionAt) {
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

let max = 110
while (value < max) {
  grid.addNext(value)
  value++
}

console.log(grid.get(0, 0) === 1)
console.log(grid.get(0, 1) === 2)
console.log(grid.get(-1, 1) === 3)
console.log(grid.get(-1, 0) === 4)
console.log(grid.get(-1, -1) === 5)
console.log(grid.get(0, -1) === 6)

console.log(grid.get(1, 2) === 10)
