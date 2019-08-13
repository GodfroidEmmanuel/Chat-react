import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBf1CdZTMhjSJGyZpF_w_6AZmENNEtjtiI",
    authDomain: "chat-react-650fc.firebaseapp.com",
    databaseURL: "https://chat-react-650fc.firebaseio.com"
})

const base = Rebase.createClass(firebase.database())

export {firebaseApp}
export default base