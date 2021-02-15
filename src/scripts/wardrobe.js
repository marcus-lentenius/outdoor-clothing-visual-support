import firestore from './firebase'

/**
 * Retrieve a list of all garments in the wardrobe
 * @returns An Array of the garments
 */
export const getWardrobe = async () => {
    const garments = [];
    return new Promise(function (resolve) {
        firestore.collection('user1501382')
            .doc('outdoorClothingList')
            .collection('savedGarments')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(async function (doc) {
                    garments.push(doc.data());
                });
                resolve(garments);
            });
    })
}

/**
 * Retrieve a list of all middle layers in the wardrobe
 * @returns An Array of the middle layers
 */
export const getMiddleLayers = async () => {
    const garments = [];
    return new Promise(function (resolve) {
        firestore.collection('user1501382')
            .doc('outdoorClothingList')
            .collection('middleLayers')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(async function (doc) {
                    garments.push(doc.data());
                });
                resolve(garments);
            });
    })
}

/**
 * Finds and updates the garments data
 * @param {object} oldGarment Old garment object to be used to find the correct document
 * @param {object} newGarment The updated garment which will replace the old data
 */
export const updateGarment = async (oldGarment, newGarment) => {
    return new Promise(function (resolve) {
        firestore.collection("user1501382")
            .doc("outdoorClothingList")
            .collection('savedGarments')
            .where("name", "==", oldGarment.name)
            .where("condition", "==", oldGarment.condition)
            .where("tempMax", "==", oldGarment.tempMax)
            .where("tempMin", "==", oldGarment.tempMin)
            .where("type", "==", oldGarment.type)
            .where("imgSrc", "==", oldGarment.imgSrc)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({
                        name: newGarment.name,
                        condition: newGarment.condition,
                        tempMax: newGarment.tempMax,
                        tempMin: newGarment.tempMin,
                        type: newGarment.type,
                        imgSrc: newGarment.imgSrc,
                    })
                });
            })
            .catch(function (error) {
                console.error("Error removing document: ", error);
            })
            .then(() => resolve(true))
    });
}

// 
//TODO: savedGarments -> wardrobe?
//TODO: on success, on fail?
/**
 * Add a garment to the wardrobe
 * @param {object} garment 
 * @returns true when completed
 */
export const addToWardrobe = async (garment) => {
    return new Promise(function (resolve) {
        firestore.collection('user1501382')
            .doc('outdoorClothingList')
            .collection('savedGarments')
            .add(garment)
            .then(() => resolve(true))
    })
}
/**
 * Add a middle layer to the middle layers
 * @param {object} garment 
 * @returns true when completed
 */
export const addToMiddleLayers = async (garment) => {
    return new Promise(function (resolve) {
        firestore.collection('user1501382')
            .doc('outdoorClothingList')
            .collection('middleLayers')
            .add(garment)
            .then(() => resolve(true))
    })
}


// TODO: is an id field in document better than compound query?
//TODO: on success, on fail?
/**
 * Remove a garment from the wardrobe //TODO: term specification needed
 * @param {object} garment 
 * @returns true when promise completed
 */
export const removeFromWardrobe = async (garment) => {
    return new Promise(function (resolve) {
        firestore.collection("user1501382")
            .doc("outdoorClothingList")
            .collection('savedGarments')
            .where("name", "==", garment.name)
            .where("condition", "==", garment.condition)
            .where("tempMax", "==", garment.tempMax)
            .where("tempMin", "==", garment.tempMin)
            .where("type", "==", garment.type)
            .where("imgSrc", "==", garment.imgSrc)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            })
            .catch(function (error) {
                console.error("Error removing document: ", error);
            })
            .then(() => resolve(true))
    });
}