
const rules = [
    {
        title: "Setup",
        text: ["There are 2 teams per game. Each round, a giver is chosen from one team, and a watcher is chosen from the other team.</p><> The giver and watcher will rotate between teams after each round."]

    }, {
        title: "Giver",
        text: ["Each round, the giver will see a card. The first word is the one you want your team to guess. The other words are words you cannot say! No gestures, rhyming word, ‘sounds like’ clues allowed", "Select Next if they guess correctly, or skip if you give up and want to display the next card. Keep going as fast as you can until time runs out!"]
    },{
        title: "Watcher",
        text: ["Each round, a watcher is chosen from the team that is not giving the clues. The watcher will be able to see the same cards as the giver, and is in charge of making sure the giver does not say any taboo words or give clues that break the rules.", "At the end of the round, all of the cards will be displayed and the watcher will confirm the status of cards: correct, skipped, or no status (cards where the giver said an illegal word or did not get their team to guess."]
    },
    {
        title: "Scoring",
        text: ["The giver’s team receives one point for each correct guess. The watcher’s team receives up to one point (depending on rules selected) for each card the giver skips. If the giver gives an illegal clue or their team cannot guess the word before time is up, no points are given to either team for that card.","The team with the most points at the end of the game wins!"]
    },
]

export default rules