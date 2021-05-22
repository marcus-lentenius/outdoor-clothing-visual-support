import firebase from 'firebase';

/**
 * Get a list of all stock images from firebase storage
 * @returns An Array of image urls
 */
export const getStorageImages = async () => {
    const storage = firebase.storage().ref("user/images/demo/");     // Path to folder in firebase storage
    const listOfImages = [];

    await storage.listAll().then(async (listFromStorage) => {   // Get all images
        for (const item of listFromStorage.items) {
            const image = {
                name: item.name,
                url: await item.getDownloadURL(),
            }
            listOfImages.push(image);
        }
    });

    return listOfImages;
}

/**
 * Delete a image from firebase storage
 * @param {string} imageName The name of the file
 */
export const deleteImage = async (imageName) => {
    const storage = firebase.storage().ref('user/images/demo/');     // Path to folder in firebase storage
    const imageReference = storage.child(imageName);    // Select image
    await imageReference.delete();
}

/**
 * Save a file to firebase storage
 * @param {string} image The captured image
 */
export const saveImage = async (image) => {
    const storage = firebase.storage().ref('user/images/demo/'); // Path to folder in firebase storage
    const format = image.format;    // Get the file format
    const imageName = image.webPath.slice(-36);     // Slice the url of the image and return only the filename

    const imageReference = storage.child(imageName + '.' + format);     // Set the name of the file

    
    const imageFile = await fetch(image.webPath);   // Fetch the captured image and make it blob
    const imageBlob = await imageFile.blob();
    
    await imageReference.put(imageBlob);    // Upload to firebase storage

    const imageUrl = imageReference.getDownloadURL();   // Return the URL to set it as the chosen image for the garment

    return imageUrl;
}
