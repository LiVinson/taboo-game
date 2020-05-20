require("custom-env").env(`${process.env.NODE_ENV || "development"}.local`, "../")

const csvParser = require("csv-parser")
const fs = require("fs")
const path = require("path")
const firebase = require("firebase/app")

//Configure firebase database
require("firebase/database")

console.log(process.argv)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const database = firebase.database()

//Confirms if arguments for action and fileName provided
const runScript = () => {
  console.log(process.argv.length)
  const action = process.argv[2]
  const fileName = process.argv[3]

  if (!action) {
    //add additional messaging
    console.log(
      "arguments are required. Type 'node import-deck -help' for assistance."
    )
    process.exit(1)
  } else if (action) {
    readFlags(action, fileName)
  }
}

//Reads arguments provided and determines action needed.
const readFlags = (action, fileName) => {
  switch (action) {
    case "-a":
    case "-add":
      console.log("add new deck")
      readDeckFile(fileName)
      break
    case "-h":
    case "-help":
      console.log("get help")
      printHelpText()
      break
    default:
      console.log("invalid flag. Try again")
      process.exit(1)
  }
}

//Receives name of deck, creates path, and opens file stream to read .csv file.
const readDeckFile = (fileName) => {
  //verify that deck exists in side of "../decks"
  const fileWithExtension = fileName.includes(".csv", fileName.length - 4)
    ? fileName
    : fileName + ".csv"
  const fullPath = path.join(__dirname, "../decks", fileWithExtension)

  //Create a file stream to read file line by line

  const cards = []
  const invalidCards = []
  const stream = fs.createReadStream(fullPath)

  stream
    .on("error", (err) => {
      console.log(err.message)
      process.exit(1)
    })

    .pipe(csvParser())
    .on("data", (row) => {
      //Checks that there are correct number of properties. If not, pushes to invalid array
      if (Object.keys(row).length === 6) {
        cards.push(row)
      } else {
        invalidCards.push(row)
      }
    })
    .on("end", () => {
      // console.log("finished reading files. Valid: ")
      // console.log(cards)

      console.log("finished reading files. invalid: ")
      console.log(invalidCards)

      addDeckToDatabase(cards)
    })
}

const addDeckToDatabase = (deck) => {
  //     //connect to to firebase here instead of globally?

  const path = "deck/"
  const dbRef = database.ref(path)
  dbRef.once("value").then((snapshot) => {
    if (snapshot.exists()) {
      //add to existing database
      console.log("update existing deck")

      dbRef.update(deck).then((snapshot) => {
        console.log("deck updated")
      })
    } else {
      //create database for first time
      console.log("Setting deck first time")
      dbRef.set(deck).then((snapshot) => {
        console.log("deck added")
      })
    }
  })
  // console.log(deck)
  // readDeck()
}

const readDeck = () => {
  const path = "deck"
  const dbRef = database.ref(path)
  dbRef.on("value", function (snapshot) {
    console.log("reading")
    console.log(snapshot.val())
  })
}

const LogErrorsToFile = () => {}

//Verifies if a filename is valid. Currently not used.
const validateFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      return true
    } else {
      console.log(`${filePath} is not valid`)
      process.exit(1)
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const printHelpText = () => {
  console.log("some helpful text")
}

// database.ref("deck").set({test: true})
runScript()
