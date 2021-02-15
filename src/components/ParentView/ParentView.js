import { IonCol, IonContent, IonGrid, IonHeader, button, IonMenu, IonMenuButton, IonRow, IonToolbar, IonList, IonButton, IonItem } from "@ionic/react";
import React, { useState } from "react";
import { addGarment, getGarments, removeGarment } from '../../scripts/garmentList';
import List from './List';
import Wardrobe from './Wardrobe';
import SuggestedOutfit from "./SuggestedOutfit";
import logo from '../../images/noImage.png';
// import Wardrobe from "./Wardrobe";

const ParentView = () => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [listOfGarments, setListOfGarments] = useState([]);

    // Loads the garments in the list from Firestore
    const loadGarments = async () => {
        setListOfGarments(await getGarments());
    }

    // Initially loads the list from Firestore
    if (!isDataLoaded) {
        loadGarments();
        setIsDataLoaded(true);
    }

    // Adds an item to the list unless it already exist
    const handleAddGarmentToList = async (garment) => {
        if (!listOfGarments.includes(garment)) {
            await addGarment(garment);
            loadGarments();
        }
    }

    // Removes the garment from the list
    const handleRemoveGarmentFromList = async (garment) => {
        await removeGarment(garment);
        loadGarments();
    }

    try {
        document.getElementById('men').open();
    } catch (error) {

    }
    return (
        <> 
            <IonMenu id="men" IonMenu scrollY side="start" contentId="main-content" type="overlay">
                <IonContent id="main-content" scrollY>
                        <Wardrobe
                            handleAddGarmentToList={handleAddGarmentToList} />
                </IonContent>
            </IonMenu>
        <IonContent >
                <List
                    listOfGarments={listOfGarments}
                    handleRemoveGarmentFromList={handleRemoveGarmentFromList} />
            </IonContent>
        </>
    );
}

export default ParentView;