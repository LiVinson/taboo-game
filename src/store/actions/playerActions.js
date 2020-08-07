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



export const addPlayerSuccess = (player) => {
	return {
		type: 'ADD_PLAYER',
		payload: {
			player,
		},
	}
}
