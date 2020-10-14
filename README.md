# Taboo!

The online multiplayer team game that's all about what you say, and what you don't! [Play Now!](https://playtaboo.app)

![GitHub license](https://img.shields.io/github/license/liVinson/taboo-game)
![Last Commit](https://img.shields.io/github/last-commit/livinson/taboo-game)

## Table of Contents

1. [About <a id="about">📝</a>](#about-)
2. [How to Play <a id="how-to-play">📋</a>](#how-to-play-)
    * [Setup](#setup)
    * [During Play](#during-play)
    * [Post Round](#post-round)
    * [Game Over](#game-over)
3. [Tools and Technology <a id="tools-and-technology">💻</a>](#tools-and-technology-)
4. [Design Process <a id="design-process">🎨</a>](#design-process-)
5. [Run Locally <a id="run-locally">🏃🏿‍♀️</a>](#run-locally-️)
6. [Testing <a id="testing">🧪</a>](#testing-)
7. [Future Developments <a id="future">🔮</a>](#future-developments-)
8. [Contributions <a id="contributions">🤝🏾</a>](#contributions-)
9. [License <a id="license">🔓</a>](#license-)
10. [Questions <a id="questions">❓</a>](#questions-)

## About <a id="about">📝</a>

Taboo! is based on the popular Hasbro board game of the same name (no affiliation). The game allows family and friends to play the verbal guessing game while physically together or virtually using meeting platforms like Zoom or Google Meets.

The motivation for this game came during quarantine while missing game nights with family and friends.

## How to Play <a id="how-to-play">📋</a>

### Setup

1. Navigate to https://playtaboo.app and select Create New Game
2. Complete the Create Game form with your name, number of turns before the game ends, and the the penalty for skipping cards (explained below)
3. Share the generated game code with family and friends so they can join
4. Once all players are in the Waiting room and have selected Team 1 or Team 2, the host selects Play to start the game.

<img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/create_game.gif" alt="Creating a Game" width="279" height="604">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/waiting.gif" alt="Waiting Room" width="279" height="604">

### During Play

1. Each round a 'giver' and 'watcher are chosen from opposing teams.
2. The 60 second round begins when the giver selects 'Play'.
3. The giver is shown a 'Taboo' card, with the word to guess at the top and five words they cannot say listed below.
4. The giver must use any verbal explanation to get their teammates to guess the word at the top.
5. Select 'Next' if they guess correctly, or 'Skip' if your team is stuck on the word.

<img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/giver.gif" alt="Giver view" width="279" height="604">

6. The 'watcher' can also see the giver's card and should select 'Buzzer' if the giver says any of the words on the taboo card.

<img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/watcher.gif" alt="Watcher's view" width="279" height="604">

### Post Round

1. Once time is up, the watcher reviews all the cards played in the round and moves them if they are not in the correct category (e.g. if the giver accidentally skipped a card, it can be moved to discarded)
2. The watcher selects 'Confirm' once all statuses are correct, and the giver/watcher roles swap.

<img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/watcher_postround.gif" alt="Watcher's view" width="279" height="604">

### Game Over

1. The game ends once all players have gone the set number of times, or all cards in the deck have been played.
2. The team with the most points wins!

<img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/end_game.gif" alt="End of Game" width="279" height="604">

## Tools and Technology <a id="tools-and-technology">💻</a>

The core of the application is built using React.js with Firebase as the SAAS. The following are the core libraries, frameworks, and npm packages used to create and run the application:

- [React.js](https://reactjs.org/) - All of the UI is made up of custom React components. React was chosen because of how well it integrates with Firebase and Firestore through higher order components, and the need for multiple reusable components and partial DOM updates.
- [Firebase Authentication](https://firebase.google.com/products/auth) - Anonymous users created in firebase used as players in each game to prevent unauthorized access to games. Firebase was chosen because of it's seemless integration with Firestore, and the ability to create persistent accounts without the user needing to provide any information.
- [Firestore](https://firebase.google.com/products/firestore) - Document based database used to store data for the game and all players. Firestore was chosen because of the ability to set up rules to protect who could participate in games, the ease of setup, and the variety of data structures permitted.
- [Styled Components](https://styled-components.com/) - CSS in JavaScript library used for styling all components. I was implementing a CSS in JS library for the first time, and Styled Components is really well documented, was easier to set up and use theming than than sass with minimal boilerplate for theming.
- [React Router](https://reactrouter.com/) - Handles routing between pages.
- [Redux.js](https://redux.js.org/) - Manages shared state between components. Although I probably could have used other data stores or even relied on the Context API in some cases, Redux, Firebase, and Firestore integrating together so seemlessly that this felt like the best choice to get the app running quickly.
- [React Redux](https://react-redux.js.org/) - Used to connect React components to Redux store
- [React Redux Firebase](http://react-redux-firebase.com/) - Provides reducers for redux store to have access to firebase. Also provides HOCs to connect components to firebase.
- [Redux Thunk](https://www.npmjs.com/package/redux-thunk) - Allows for asynchronous interactions with redux store (e.g. querying/updating firestore).
- [Redux Firestore](https://www.npmjs.com/package/redux-firestore) - Provides reducers for redux store to have access to firestore.
- [Formik](https://formik.org/) - Provides components for forms. I chose to use formik for how easy it made validation and error messages and because I could easily use my own custom components within formik.

* [Randomatic](https://www.npmjs.com/package/randomatic) - Generates gamecodes. It was really easy to implement, and even let me choose combinations not to use (e.g. o and O) to prevent confusion for users.

## Design Process <a id="design-process">🎨</a>

From the very beginning, I was not sure of the overall design but I had some set ideas on what I wanted the design to fulfill:

* Be extremely mobile friendly since that is how most people would play.
* Look fun and game-like, but without looking like was targeted to children.
* Heavily incorporate actual game card components that stayed true to the look and feel in the actual game.

With this is mind, I used Figma to go through several iterations of the design before settling on the final concept and building out the prototype of all screens in the entire application.

<img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/taboo_version1.png" alt="Taboo Design Version 1" width="180"/> <img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/taboo_version2.png" alt="Taboo Design Version 2" width="180"/> <img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/taboo_version3.png" alt="Taboo Design Version 3" width="180"/> <img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/taboo_version4.png" alt="Taboo Design Version 4" width="180"/> <img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/taboo_version5.png" alt="Taboo Design Version 5" width="180"/> <img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/taboo_version6.png" alt="Taboo Design Version 6" width="180"/>

Although there were aspects of all of these designs I liked, the early illustration  showed my own preference for dark themes/designs but was far too dark to really feel "game-y" and. The next few illustrations had better color choices, but the multi-color solid and  gradient backgrounds were too overwhelming. Removing the background color or reducing the gradient to just the white and blue felt closer, but did still felt too "heavy" for a game.

<img src="https://github.com/LiVinson/taboo-game/blob/master/public/img/taboo_version_final.png" alt="Taboo Design Final Version" width="180"/>

The version I chose used a background image that I designed using a series of exclamation point icons in the same colors used for the layer of cards. This allowed me to infuse the color and fun feel, carry through the theme into the background with the use of the exclamation points, and avoid the heaviness of the earlier designs. Also, it has the versatility of being usable for a dark theme design that I plan to roll out soon with minimal changes.

Overall, I really enjoyed designing this application because it pushed me outside of my comfort zone in it's use of colors and creating a "fun" look that it is not typical of most of my projects.

## Run Locally <a id="run-locally">🏃🏿‍♀️</a>

Clone this repository and navigate into the taboo-game directory.

```git clone git@github.com:LiVinson/taboo-game.git```

```cd project-sass```

Install all of the dependencies listed in the package.json

```npm install``` or ```yarn install```

Create a [firebase web project with firestore](https://firebase.google.com/). Create a .env file in the root of your repostory with the project information provided by firebase

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

```npm start``` or ```yarn start```

To have a fully functioning game, a deck will need to be created and added in firestore at the /cards path of the database. The document id should correspond to the taboo word with a tabooList array of the 5 strings that are the taboo words that cannot be said.

Check out the [admin program I created](https://github.com/LiVinson/taboo-game-back) for more information on adding a large deck of cards through importing from a csv and other admin functionalities like viewing suggestions.

## Testing <a id="testing">🧪</a>

To run unit tests:

```npm run test``` or ```yarn run test```.

### Testing tools

**Jest**: Test Runnner

**React Test Renderer**: Renders React components as pure JS objects. Used in conjunction with Jest to create snapshot files that determine if any UI changes have been made to component.

**Note**: RTT was used instead of enzyme with enzyme-to-json because this library rendered the entire theme object when rendering styled components. This meant that any change to the theme (e.g. changing a color hex code) resulted in a change to the snapshot, even when unrelated to a change in the component.

**Enzyme**: Provides shallow and full DOM rendering of components and an API to make assertions on  the component instance.

**Jest Styled Components**: Used to help testing styled components. Allows snapshots to be rendered with the exact style information in the snapshot instead of ambiguous class names. Allows for better testing React components that make use of the theme prop.

## Future Developments <a id="future">🔮</a>

This project is being continuously updated, and all feedback and suggestions are greatly appreciated. Some future development ideas include:

* Adding a dark theme layout
* Adding the ability to set a game time limit
* Allowing 'observers' to join a game after it has started
* Allow users to add custom 'private' cards to their game deck that only they can access
* Many more!
  
In addition to adding more features, I acknowledge there are countless ways to improve the code itself to better align with the latest coding standards and conventions. A few of these include:

- Converting React class components to hooks
- Using Firebase hooks instead of higher order components to connect React components to Firebase and Firestore
- Adding TypeScript
- Increasing code coverage

## Contributions <a id="contributions">🤝🏾</a>

I am not open to contributions to the code at this time, but I am always happy to hear feedback and suggestions via email or by creating an issue. You can also contribute to the game by [making suggestions](https://playtaboo.app/home/submit) for adding new taboo cards to the deck directly on the website.

## License <a id="license">🔓</a>

This project is licensed with [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/#). Review the included [LICENSE.md](https://github.com/LiVinson/taboo-game/blob/master/LICENSE) file for more information.

## Questions <a id="questions">❓</a>

 Please reach out with feedback, suggestions, or questions about this project at any time at **contact@lisavinson.com**.
