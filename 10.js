const input = `97,167,54,178,2,11,209,174,119,248,254,0,255,1,64,190`
const lengths = input.split(',').map(value => parseInt(value, 10))
const testLengths = [3, 4, 1, 5]
let list = new Array(256).fill('').map((value, index) => index)

let cursor = 0
lengths.forEach((length, skip) => {
  let start = cursor % list.length

  let reverse = []
  for (let i = start; i < start + length; i++) {
    reverse.unshift(list[i % list.length])
  }
  for (let i = start; i < start + length; i++) {
    list[i % list.length] = reverse.shift()
  }

  cursor += length + skip
})
console.log(list[0] * list[1])

// 2
let list2 = new Array(256).fill('').map((value, index) => index)
const lengths2 = input.split('').map(char => char.charCodeAt(0)).concat([17, 31, 73, 47, 23])
let cursor2 = 0
let skip = 0

for (var runs = 0; runs < 64; runs++) {
  lengths2.forEach(length => {
    let start = cursor2 % list2.length

    let reverse = []
    for (let i = start; i < start + length; i++) {
      reverse.unshift(list2[i % list2.length])
    }
    for (let i = start; i < start + length; i++) {
      list2[i % list2.length] = reverse.shift()
    }

    cursor2 += length + skip
    skip++
  })
}

const dense = []
let extract = list2.splice(0, 16)
while (extract.length) {
  dense.push(extract.reduce((acc, current) => acc ^ current))
  extract = list2.splice(0, 16)
}

const knotHash = dense.reduce((acc, current) => `${acc}${current.toString(16)}`, '')
console.log(knotHash)
