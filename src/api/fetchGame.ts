import firebase from 'firebase'
import type { Game } from '../types'

type TGame = Game | undefined | null

export function fetchGame(id: string, callback: (game: TGame) => void) {
    const status = { shouldCall: true }

    firebase
        .database()
        .ref(`games/${id}`)
        .on('value', (snapshot: firebase.database.DataSnapshot) => {
            if (status.shouldCall) {
                callback(snapshot.val() as TGame)
            }
        })

    return {
        remove: () => {
            status.shouldCall = false
        },
    }
}
