import firebase from './fbConfig'

export const createPlayer = (playerName) => {
    console.log('creating player in firebase...')    
    return new Promise((resolve, reject) => {
        return firebase
		.auth()
		.signInAnonymously()
		.then((res) => {
            console.log('created a player in firebase')
            console.log(res)
			const user = firebase.auth().currentUser
			user.updateProfile({
				displayName: playerName,
			})
            .then((res) => {
                console.log('updated username in firebase')
                // console.log(res)
                // console.log(user)
                const player = {
                    playerId: user.uid, name: user.displayName
                }
                resolve(player) 
            })
            .catch((error) => {
                console.log('there was an error updating usernamein firebase ')
                console.log(error)
                // reject(error)
            })
		})
		.catch((error) => {
			console.log('there was an error creating user')
			console.log(error)
            return reject(error)
		})    
    })
}
