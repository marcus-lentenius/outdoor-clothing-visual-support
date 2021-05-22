import firebaseToken from "./firebaseToken";
import firebase from 'firebase'

const email = 'usertwo@test.com'
const password = 'userTwo'

//FIXME: name
// const firebaseApp = firebase.initializeApp({
//     apiKey: firebaseToken,
//     authDomain: "outdoor-clothing-visual-aid.firebaseapp.com",
//     projectId: "outdoor-clothing-visual-aid",
//     storageBucket: "outdoor-clothing-visual-aid.appspot.com",
//     messagingSenderId: "1069071883888",
//     appId: "1:1069071883888:web:15a9a93a21b5e1a08a5eb5",
//     measurementId: "G-ZB4VV3060W"
// });
const firebaseConfig = {
    apiKey: firebaseToken,
    authDomain: "outdoor-clothing-visual-aid.firebaseapp.com",
    projectId: "outdoor-clothing-visual-aid",
    storageBucket: "outdoor-clothing-visual-aid.appspot.com",
    messagingSenderId: "1069071883888",
    appId: "1:1069071883888:web:15a9a93a21b5e1a08a5eb5",
    measurementId: "G-ZB4VV3060W"
};


export const provider = new firebase.auth.GoogleAuthProvider();
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()
/**
 * Checks if any user is currently logged in
 */
// export const anyCurrentUser = async () => {
//     return new Promise(function (resolve) {
//         firebase.auth().onAuthStateChanged(function (user) {
//             if (user != null) {
//                 localStorage.setItem('isAuthenticated', true); // Use local storage for quicker verification
//                 resolve(true);
//             } else {
//                 resolve(false);
//             }
//         });
//     });
// }

/**
 * Authenticates the user to Google Firebase
 */
//TODO: Pretty up
export const authenticate = () => {
    return new Promise(function (resolve) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user != null) {
                resolve(true);
            } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION) //TODO: Change to SESSION
            .then(() => {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        resolve(true);
                    })
                    .catch((error) => {
                        resolve(false);
                    });
            })
            .catch((error) => {
                // TODO: Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
        });


    });
}



/**
 * Checks if any user is currently logged in
 */
 export const anyCurrentUser = async () => {
    return new Promise(function (resolve) {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user != null) {
                console.log("Log:  - user", user)
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

export const signIn = () => {
    var signedIn = false;

    firebaseApp.auth().signInWithRedirect(provider)
        .then((result) => {
            signedIn = true;
        })
        .catch((error) => {
        });

    return signedIn;
}

export const signOut = () => {
    var signedIn = false;

    firebase.auth().signOut()
        .then((a) => {
            signedIn = true;
        })
        .catch((error) => {
        });

    return signedIn;
}



export default firestore;