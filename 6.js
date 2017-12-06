const banks = '0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11'.split('	').map(v => parseInt(v))
const test = [0, 2, 7, 0];

const Swapper = class {
  constructor(initialBanks) {
    this.banks = [...initialBanks]
    this.swapCount = 0
    this.statesSeen = {}
  }

  done() {
    return this.statesSeen[this.banks.join()]
  }

  distribute() {
    this.statesSeen[this.banks.join()] = true

    let value = Math.max(...this.banks)
    let index = this.banks.indexOf(value)
    this.banks[index] = 0
    while (value) {
      index = (index + 1) % this.banks.length
      this.banks[index]++
      value--
    }
    this.swapCount++
  }
}

const swapper = new Swapper(banks)

while (!swapper.done()) {
  swapper.distribute()
}
console.log(swapper.swapCount)
