import { v4 as uuidv4 } from "uuid"

export function createNewCode() {
  return new Promise(function (resolve, reject) {
    const longCode = uuidv4()
    //shorten to only use first part of code
    const shortCode = longCode.split("-")[0]
    resolve(shortCode)
  })
}

//Converts FB object with a property for each element Object
// into array of element objects
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
    Sample Output: [{name: "Bob", id: 12345}, {name:"Test", id:98765}]
}]
  }*/

  for (let keyObj in fbObject) {
    const newObj = {}
    for (let key in fbObject[keyObj]) {
      newObj[key] = fbObject[keyObj][key]
    }
    // console.log(newObj)
    fbArray.push(newObj)
  }
  return fbArray
}

//Checks if array contains an object with the property name === value
export function includedInArrayOfObjects(arr, property, value) {
  const filteredArray = arr.filter((item) => item[property] === value)
  // console.log(filteredArray)
  return filteredArray.length > 0
}


/*
value: the value returned from firebase
type: The type of event listener
check: The value to compare to determine next action
cb_true: call back if check value is true
cb_false: call back if check value is false

 */
export function handleListenerCallbacks(value, type, temp, action) {
  const {check, cb_true, cb_false} = action
  
  console.log(action)
  //e.g. action.round_status
  if(action.check) {
      cb_true(value)
  } else {
    cb_false(value)
  }

}