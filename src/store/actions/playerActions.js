// const createPlayer = (playerName, gamecode) => {
//     return (dispatch, getState, {getFirebase, getFirestore}) => {

//         const firebase = getFirebase()
//         console.log("creating player in firebase...")

//         firebase
//         .auth()
//         .signInAnonymously()
//         .then((res)=> {
//             console.log("created a player in firebase")
//             const user = firebase.auth().currentUser
//             user.updateProfile({
//                 displayName: playerName
//             }).then(res => {
//                 console.log("updated player name. dispatching...")
//                 console.log(res)
//                 dispatch({
//                     type: "CREATE_PLAYER",
//                     payload: {
//                         uid: user.uid,
//                         name: user.displayName
//                     }
//                 })
//             })
//             .catch(error => {
//                 console.log("error adding player")
//                 console.log(error)
//                 dispatch({
//                     type: "CREATE_PLAYER_ERROR",
//                     error
//                 })
//             })
//         })
//     }
// }

export const addPlayer = (player, gamecode, getFirestore, dispatch) => {
	console.log('action to add player')
	console.log(player)
	return new Promise((resolve, reject) => {
		const firestore = getFirestore()
		return firestore
			.collection('games')
			.doc(gamecode)
			.update({
				players: firestore.FieldValue.arrayUnion(player),
			})
			.then(() => {
				dispatch({
					type: 'ADD_PLAYER',
					payload: {
						player,
					},
				})
				resolve('player added')
			})
	})
}
