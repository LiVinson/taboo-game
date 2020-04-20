import { v4 as uuidv4 } from "uuid"

export function createNewCode() {
  const longCode = uuidv4()
  //shorten to only use first part of code
  const shortCode = longCode.split("-")[0]
  return shortCode
}
