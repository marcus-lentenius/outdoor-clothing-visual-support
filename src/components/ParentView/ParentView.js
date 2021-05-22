import { IonContent, IonMenu } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addGarment, getGarments, removeGarment } from '../../scripts/garmentList';
import List from './List';
import Menu from './menu/Menu';
// import Wardrobe from "./Wardrobe";

const ParentView = () => {
    const [listOfGarments, setListOfGarments] = useState([]);

    // Load the garments
    useEffect(() => {
        loadGarments();
    }, [])

    // Loads the garments in the list from Firestore
    const loadGarments = async () => {
        setListOfGarments(await getGarments());
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

    // try {
    //     document.getElementById('men').open();
    // } catch (error) {

    // }

    return (
        <>
            <IonMenu id="men" side="start" contentId="main-content" type="overlay">
                <IonContent id="main-content" scrollY>
                    <Menu
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