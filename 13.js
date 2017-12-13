const input = `0: 3
1: 2
2: 9
4: 4
6: 4
8: 6
10: 6
12: 8
14: 5
16: 6
18: 8
20: 8
22: 8
24: 6
26: 12
28: 12
30: 8
32: 10
34: 12
36: 12
38: 10
40: 12
42: 12
44: 12
46: 12
48: 14
50: 14
52: 8
54: 12
56: 14
58: 14
60: 14
64: 14
66: 14
68: 14
70: 14
72: 14
74: 12
76: 18
78: 14
80: 14
86: 18
88: 18
94: 20
98: 18`

const test = `0: 3
1: 2
4: 4
6: 4`

// Debug
const droppedAt = {}

const parsedLayers = {}
input.split('\n').forEach(row => {
  const split = row.split(': ')
  parsedLayers[split[0]] = {
    depth: parseInt(split[1], 10),
  }
})
const layerKeys = Object.keys(parsedLayers)

function getScore(delay = 0) {
  let score = null
  const layers = {}
  layerKeys.forEach(key => {
    const layer = parsedLayers[key];
    layers[key] = {
      ...layer,
      position: 0,
      direction: 1
    }
  })

  const moveScanners = (by = 1) => {
    layerKeys.forEach(layerKey => {
      const layer = layers[layerKey]
      const { depth } = layer
      for (let i = 0; i < by; i++) {
        const { position, direction } = layer
        layer.position += direction
        if (layer.position === 0) {
          layer.direction = 1
        }
        else if (layer.position === depth - 1) {
          layer.direction = -1
        }
      }
    })
  }

  moveScanners(delay)

  const end = Math.max(...layerKeys)
  for (let step = 0; step <= end; step++) {
    const scanner = layers[step]
    if (scanner && scanner.position === 0) {
      score += step * scanner.depth
      // Debug
      droppedAt[step] = (droppedAt[step] || 0) + 1
      // Only for part 2
      return score
    }
    moveScanners()
  }
  return score
}

// console.log(`Result 1: ${getScore()}`)

// 2
// How long do we initially have to wait so we can get a pass without getting caught at all?

let delay = 0
while (getScore(delay) !== null) {
  delay++
  if (delay % 100 === 0) {
    console.log(delay)
    console.log(droppedAt)
  }
}

console.log(`Result 2: ${delay}`)

// console.log(getScore(5))
