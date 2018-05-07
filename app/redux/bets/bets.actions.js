import firebase from 'firebase'
import betReducer from './bets.reducer'
import { getUserId } from '../user'

export const fetchBet = matchId => (dispatch, getState) => {
  const uid = getUserId(getState())
  firebase
    .firestore()
    .collection('bets')
    .where('match', '==', matchId)
    .where('user', '==', uid)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        dispatch(betReducer.addOrUpdate({ id: matchId }))
      } else {
        querySnapshot.forEach(doc =>
          dispatch(betReducer.addOrUpdate({ id: matchId, ...doc.data() })),
        )
      }
    })
}

export const saveBet = (matchId, bet) => (dispatch, getState) => {
  const uid = getUserId(getState())

  firebase
    .firestore()
    .collection('bets')
    .doc(`${matchId}_${uid}`)
    .set({ ...bet, match: matchId, user: uid }, { merge: true })
    .then(() => {
      dispatch(betReducer.addOrUpdate({ id: matchId, ...bet }))
    })
}
