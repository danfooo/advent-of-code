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

const layers = {}
input.split('\n').forEach(row => {
  const split = row.split(': ')
  layers[parseInt(split[0], 10)] = {
    depth: parseInt(split[1], 10),
    position: 0,
    direction: 1
  }
})
const layerKeys = Object.keys(layers)
const end = Math.max(...layerKeys)

const moveScanners = () => {
  layerKeys.forEach(layerKey => {
    const layer = layers[layerKey]
    const { depth, position, direction } = layer
    layer.position += direction
    if (layer.position === 0) {
      layer.direction = 1
    }
    else if (layer.position === depth - 1) {
      layer.direction = -1
    }
  })
}

let score = 0

for (let step = 0; step < end; step++) {
  const scanner = layers[step]
  if (scanner && scanner.position === 0) {
    score += step * scanner.depth
  }
  moveScanners()
}

console.log(score)
