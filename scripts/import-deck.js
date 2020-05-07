// const importFile = "deck-100.csv"
require("custom-env").env(`${process.env.NODE_ENV}.local`, "../")
const csvParser = require("csv-parser");
const fs = require("fs")
const path = require("path")
const firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/database");


console.log("current environment: ", process.env.NODE_ENV)


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

const addNewDeck = (fileName, deckId) =>  {
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



    

    // } 
    

}

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


// if(!flags[0] || flags[0] !== "-d" || flags[0] !== "-deck") {
//     console.log("Must pass -d flag to import a new deck. Example: node script.js -d 'deckFile'")
//     process.exist(1);
// }

//Structure: NODE_ENV=[env] node script.js -d "deckfile"

//Confirm length of arguments is greater than 2



//Grab deck id from file name.
//Check if this deck already exists in the database
    //If so, log a message, exit script

//Read file and save each line as an element in an array
//Loop over array and create object: 
    /*{
        apple: {
            category: thing,
            taboo1: fruit,
            taboo2: red,
            taboo3: test,
            taboo4: test,
            taboo5: test
        },
        birthday: {...}
    }
    */

   //Insert contents of array into firebase
   //Add id/indication matching deck into firebase for future checks (avoid same cards added twice)
   //Write to log the deck 'id' and number of cards that were added 