
const rules = [
    {
        title: "Setup",
        text: ["Taboo is a verbal team game that can be played via any platforms that allows the players to hear each other, like Google Meets, Zoom, Skype, or even a group phone call.","Once a new game is created, a game code is generated. Anyone who enters the game code will be added to the waiting room while all players join. Once everyone has joined and selected a team, the game can begin."]

    }, {
        title: "Setup (cont.)",
        text: ["There are two teams with two or more players. Each round, a clue giver and a watcher are chosen from opposing teams with the roles alternating between teams after each round."]
    }, {
        title: "Clue Giver",
        text: ["When the round starts, the clue giver can see a card with the clue word at the top and the list of taboo words below. The other players cannot see the card.","The clue giver must get their team to guess the clue word, without saying any form of the taboo words. To view the next card in the pile, the giver selects Next if their team guessed correctly, or Skip if the team is unable to figure out the clue word.","The giver continues to view cards and give clues until the round timer ends."]
    }, {
        title: "Clue Giver (cont.)",
        text: ["When giving clues, the clue giver can not say any part of the clue word or the taboo words. For example, if the word to guess is 'microwave' the clue giver cannot say micro, microphone, waving, etc.", "The clue giver cannot use rhyming patterns to give clues or any version of the clue word or taboo words in another language.", "Props or pointing to anything are not allowed as clues." ]
    }, {
        title: "Watcher",
        text: ["The watcher will also be able to see the word to guess and the list of taboo words at the same time as the clue giver. If the giver says any part of the word to guess, says any form of the taboo words, or breaks any other rules, the watcher selects the Buzzer button to force the giver to move to the next card in the pile.","The watcher's teammates should not guess or help the clue giver in any way."]
    },
    {
        title: "Scoring",
        text: ["Once the timer for the round expires, the watcher reviews the cards and confirms each one is the right pile: correct, skipped, or discarded.","Correct cards are worth one point for the giving team and skipped cards are worth 0, ½, or 1 point for the watcher's team, depending on the game settings. Discarded cards are not worth anything.", "The game ends when the game timer reaches zero, or when each player has been the giver the number of times determined when the game is created. The team with the most points at the end of the game wins!"]
    },
]

export default rules