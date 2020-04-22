import { v4 as uuidv4 } from "uuid"

export function createNewCode() {
  return new Promise(function (resolve, reject) {
    const longCode = uuidv4()
    //shorten to only use first part of code
    const shortCode = longCode.split("-")[0]
    resolve(shortCode)
  })
}

export function convertFBObjectToArray(fbObject) {
  const fbArray = []

  /*
  Sample Input
    fbObject = {
      12345: {
        name: "Bob",
        id: 12345
      },
      98765: {
        name: "Test",
        id: 98765
      }
    Output: [{name: "Bob", id: 12345}, {name:"Test", id:98765}]
}]
  }*/

  for (let keyObj in fbObject) {
    //console.log(fbObject[keyObj])
    const newObj = {}
    for (let key in fbObject[keyObj]) {
      newObj[key] = fbObject[keyObj][key]
    }
    console.log(newObj)
    fbArray.push(newObj)
  }
  return fbArray
}

export function includedInArray(arr, property, value) {
  const filteredArray = arr.filter((item) => item[property] === value)
  console.log(filteredArray)
  return filteredArray.length > 0
}
