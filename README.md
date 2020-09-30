# Taboo!

The online multiplayer team game that's all about what you say, and what you don't! [Play Now!](https://playtaboo.app)

## Table of Contents

1. [About](#about)

2. [How to Play](#how-to-play)
    * [Setup](#setup)
    * [During Play](#during-play)
    * [Post Round](#post-round)
    * [Game Over](#game-over)

3. [Tools and Technology](#tools-and-technology)

4. [Run Locally](#run-locally)

5. [Testing](#testing)

6. [Future Developments](#future)

7. [Contributions](#contributions)

8. [License](#license)

9.  [Questions](#questions)

## About <a id="about">📝</a>

Taboo! is based on the popular Hasbro board game of the same name (no affiliation). The game allows family and friends to play the verbal guessing game while physically together or virtually using meeting platforms like Zoom or Google Meets.

THe motivation for this game came during quarantine while missing game nights with family and friends.

## How to Play <a id="how-to-play">📋</a>
### Setup
1. Navigate to https://playtaboo.app and select Create New Game
2. Complete the Create Game form with your name, number of turns before the game ends, and the the penalty for skipping cards (explained below)
3. Family and friends can join using the generated gamecode
4. Once all players are in the Waiting room and have selected Team 1 or Team 2, the host selects Play to start the game.

### During Play

1. Each round a 'giver' and 'watcher are chosen from opposing teams.
2. The 60 second round begins when the giver selects 'Play'.
3. The giver is showin a 'Taboo' card, with the word to guess at the top and five words they cannot say listed below.
4. The giver must use any verbal explanation to get their teammates to guess the word at the top.
5. Select 'Next' if they guess correctly, or 'Skip' if your team is stuck on the word.
6. The 'watcher' can also see the giver's card and should select 'Buzzer' if the giver says any of the words on the taboo card.

### Post Round
1. Once time is up, the watcher reviews all the cards played in the round and moves them if they are not in the correct category (i.e. if the giver accidentally skipped a card, it can be moved to discarded)
2. The watcher selects 'Confirm' once all statuses are correct, and the giver/watcher roles swap.

### Game Over
1. The game ends once all players have gone the set number of times, or all cards in the deck have been played.
2. The team with the most points wins!

## Tools and Technology <a id="tools-and-technology">💻</a>

The core of the application is built using React.js with Firebase as the SAAS. The following are the core libraries, frameworks, and npm packages used to create and run the application:

* [React.js](https://reactjs.org/) - All of the UI is made up of custom React components.
* [Firebase Authentication](https://firebase.google.com/products/auth) - Anonymous users created in firebase used as players in each game to prevent unauthorized access to games
* [Firestore (with Firestore)](https://firebase.google.com/products/firestore) - Used to store data for the game and all players
* [Styled Components]() - CSS in JavaScript library used for styling all components 
* [React Router](https://reactrouter.com/) - Handles routing between pages
* [Redux.js](https://redux.js.org/) - Manages shared state between components
* [React Redux](https://react-redux.js.org/) - Used to connect React components to Redux store
* [React Redux Firebase](http://react-redux-firebase.com/) - Provides reducers for redux store to have access to firebase. Also provides HOCs to connect components to firebase.
* [Redux Thunk](https://www.npmjs.com/package/redux-thunk) - Allows for asynchronous interactions with redux store (e.g. querying/updating firestore).
* [Redux Firestore](https://www.npmjs.com/package/redux-firestore) - Provides reducers for redux store to have access to firestore.
* [Formik](https://formik.org/) - Provides components for forms

* [Randomatic](https://www.npmjs.com/package/randomatic) - Generates gamecodes
  
## Run Locally <a id="run-locally">🏃🏿‍♀️</a>

Clone this repository and navigate into the taboo-game directory.

```git clone git@github.com:LiVinson/taboo-game.git```

```cd project-sass```

Install all of the dependencies listed in the package.json

```npm install```

Create a firebase project with firestore. Create a .env file in the root of your repostory with the project information provided by firebase

```REACT_APP_API_KEY=<your-api-key>
REACT_APP_AUTH_DOMAIN=<your-auth-key>
REACT_APP_DB_URL=<your-db-url>
REACT_APP_PROJECT_ID=<your-project-id>
REACT_APP_STORAGE_BUCKET=<your-storage-bucket>
REACT_APP_MSG_SENDER_ID=<your-msg-sender-id>
REACT_APP_APP_ID=<your-api-key>
REACT_APP_MEASUREMENT_ID=<your-measurement-id>
```

Start the React server.

```npm start```

To have a fully functioning game, a deck will need to be created and added in firestore at the /deck path. Check out the [admin program I created](https://github.com/LiVinson/taboo-game-back) for more information on adding cards and other admin functionalities.

## Testing <a id="testing">🧪</a>

To run unit tests:

```yarn run test``` or ```npm run test```.

### Testing tools

**Jest**: Test Runnner

**React Test Renderer**: Renders React components as pure JS objects. Used in conjunction with Jest to create snapshot files that determine if any UI changes have been made to component.

**Note**: This was used instead of enzyme with enzyme-to-json because this library rendered the entire theme object when rendering styled components. This meant that any change to the theme resulted ina change to the snapshot, even when unrelated to the component.

**Enzyme**: Provides shallow and full DOM rendering of components and an API to make assertions on  the component instance.

**Jest Styled Components**: Used to help testing styled components. Allows snapshots to be rendered with the exact style information in snapshot instead of ambiguous class names. Allows for better testing React components that make use of the theme prop.

## Future Developments <a id="future">🤝🔮</a> 

This project is being continuously updated, and all feedback and suggestions are greatly appreciated. Some future development ideas include:

* Adding a dark theme layout
* Adding the ability to set a game time limit
* Allowing 'observers' to join a game after it has started.
* Allow users to add custom 'private' cards to their game deck
* Many more!
  
## Contributions <a id="contributions">🤝🏾</a> 

I am not open to contributions to the code at this time, but I am always happy to hear feedback and suggestions via email or by creating an issue. You can also contribute to the game by making suggestions for adding new taboo cards directly on the website.

## License <a id="license">🔓</a>

Here is some license information

## Questions <a id="questions">❓</a> 

 Please reach out with questions about this project at any time at **contact@lisavinson.com**.
