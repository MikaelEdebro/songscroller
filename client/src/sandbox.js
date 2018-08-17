const inArray = {
  hej: true,
  dooo: false,
}

const keys = Object.keys(inArray)
console.log(keys)

for (let i in inArray) {
  console.log(i)
}

const ofArray = ['s', 'd']

for (const i of ofArray) {
  console.log(i)
}

const sum = ofArray.forEach(s => console.log(s))
console.log(sum)
