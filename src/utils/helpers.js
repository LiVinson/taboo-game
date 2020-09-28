/* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray = (array) => {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}

	return array
}

export const convertArrayToObject = (array) => {
	const convertedObject = array.reduce((updatedObject, element, index) => {
		return {
			...updatedObject,
			[index]: element,
		}
	}, {})
	return convertedObject
}

export const generateSkipText = (skipPenalty) => {
	let skipText
	switch (skipPenalty) {
		case 'half':
			skipText = 'half a point'
			break
		case 'full':
			skipText = 'one point'
			break
		default:
			skipText = 'no points'
			break
	}

	return `Each correct card is worth one point, skipped cards are worth ${skipText} for the other team, and discarded cards are worth no points.\n`
}

export const generateEndGameText = (endGameMethod, endGameValue) => {
	let endGameText
	if (endGameMethod === 'turns') {
		endGameText = `each player has had ${endGameValue} turns giving clues`
	} else {
		endGameText = `${endGameValue} minutes`
	}
	return `The game ends after ${endGameText} or all cards have been played. Good luck!`
}

export const createGreetingMsg = () => {
	const line1 = '%cHi There!'
	const style1 = `font-size: 2.6rem; color: #1982C4; font-style:Palatino; letter-spacing: 2px`
	const line2 =
		"%cThanks for checking out my game. My name is Lisa  and I'm  looking for my next software developer position.\n\nIf you're hiring or know someone who is, you can find my contact info at "
	const style2 = `font-size: 1rem; color:#333333; font-style:Palatino`
	const line3 = `%chttps://www.lisavinson.com`
	const style3 = `font-size: 1rem; font-weight:bold; color:red; font-style:Palatino`

	console.log(line1 + line2 + line3, style1, style2, style3)
}
