import fireStore from './firebase';
import firebase from "firebase";

//TODO: change function to ()=>
/**
 * Retrieve the list of chosen garments
 */
export const getGarments = async () => {
    return new Promise(function (resolve) {
        fireStore.collection('user1501382').doc('outdoorClothingList').onSnapshot(snapshot => {
            resolve(snapshot.data().list);
        });
    })
}

/**
 * Add a garment object to the list of chosen garments
 * @param {object} garment 
 */
export const addGarment = async (garment) => {
    try {
        fireStore.collection('user1501382').doc('outdoorClothingList').update({
            list: firebase.firestore.FieldValue.arrayUnion(garment)
        });
        //TODO: e -> not generic
    } catch (e) {
        console.error('write error: ', e);
    }
}

/**
 * Remove a garment from the list of chosen garments
 * @param {object} garment 
 */
export const removeGarment = async (garment) => {
    return new Promise(function (resolve) {
        fireStore.collection('user1501382').doc('outdoorClothingList').update({
            list: firebase.firestore.FieldValue.arrayRemove(garment)
        }).then(() => resolve(true)).catch((e) => console.error('delete error: ', e));
    })
}