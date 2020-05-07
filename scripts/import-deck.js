require("custom-env").env(`${process.env.NODE_ENV}.local`, "../")
const csvParser = require("csv-parser");
const fs = require("fs")
const path = require("path")
const firebase = require("firebase/app");

//Configure firebase database
require("firebase/database");

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
const runScript = ()=> {
    console.log(process.argv.length)
    const action = process.argv[2]
    const fileName = process.argv[3]

    if (!action || !fileName) {
        //add additional messaging
        console.log("arguments are required")
        process.exit(1)
    } else {
        readFlags(action, fileName)
    }
}

//Reads arguments provided and determines action needed.
const readFlags = (action, fileName) => {    
    switch (action) {
        case "-a":
        case "-add":
            console.log("add new deck")
            addNewDeck(fileName)
            break;
        default:
            console.log("something's wrong")
    }
}

//Receives name of deck, creates path, and opens file stream to read .csv file.
const addNewDeck = (fileName) =>  {
    //verify that deck exists in side of "../decks"
    const fileWithExtension = fileName.includes(".csv", fileName.length-4) ? fileName : fileName + ".csv"
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
            if((Object.keys(row)).length === 3) {
                cards.push(row)
            } else {
                invalidCards.push(row)
            }            
        })
        .on("end", () => {
            console.log("finished reading files. Valid: ")
            console.log(cards)
            
            console.log("finished reading files. invalid: ")
            console.log(invalidCards)
        })   
}

//Verifies if a filename is valid. Currently not used.
const validateFile = (filePath) => {
    try {
        if(fs.existsSync(filePath)) {
            return true
        } else {
            console.log(`${filePath} is not valid`)
            process.exit(1)
        }
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

runScript();