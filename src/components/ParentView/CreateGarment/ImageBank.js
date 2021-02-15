import { IonButton, IonList, IonContent, IonGrid, IonImg, IonInput, IonItem, IonIcon, IonRow, IonSelect, IonSelectOption, IonCol, IonCard, IonCardHeader, IonCardContent, IonAlert, IonCheckbox, IonLabel, IonItemOption } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getStorageImages, saveImage, deleteImage } from '../../../scripts/storageImages';
import Header from '../../shared/Header';
import { addToWardrobe } from '../../../scripts/wardrobe';
import { Plugins, CameraResultType } from '@capacitor/core';
import noImage from '../../../images/noImage.png';
import Thumbnail from '../Thumbnail';
import { snow, cloudy, leaf, rainy, sunny, trash, thermometer, arrowDown, arrowUndo, arrowUp, swapVertical, cloud } from 'ionicons/icons';
import Condition from './Condition';

/**
 * An image bank displaying the users saved pictures
 * @param {*} chosenImage The image to be displayed
 * @param {*} listOfImages List containing the images
 * @param {*} setChosenImage Function to change the chosenImage state in CreateGarment component
 */
const ImageBank = ({ loadImages, chosenImage, listOfImages, setChosenImage }) => {

    /**
     * Deleting the image
     * @param {object} image Object containing the name of the file and the url to it
     */
    const handleDeleteImage = async (image) => {
        await deleteImage(image.name); // Pass the file name of the image

        // Resets the chosen image if the image to be deleted is same as the chosen image for the garment
        if (image.url === chosenImage) {
            setChosenImage(noImage);
        }

        loadImages();   // Reload the list of images in the CreateGarment component
    }

    return (
        <>
            {listOfImages.map((image) => {
                const labelId = `image-from-storage-${image.url}`;
                return (
                    <IonCol key={labelId}>
                        <Thumbnail
                            clickEvent={setChosenImage}
                            eventParameter={image.url}
                            src={image.url}
                            height={100}
                            width={100} />
                        <IonButton onClick={() => handleDeleteImage(image, image.url)}>Delete</IonButton>
                    </IonCol>
                );
            })}
        </>
    );
}

export default ImageBank;