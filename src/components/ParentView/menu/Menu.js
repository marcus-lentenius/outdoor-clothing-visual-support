import { IonButton, IonItem, IonList } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { getMiddleLayers, getWardrobe } from '../../../scripts/wardrobe';
import Garment from './Garment';
import SuggestedOutfit from "./SuggestedOutfit";


/**
 * This is the view of the users saved garments. 
 * It provides a list of the saved garments and buttons to 
 * add them to the GarmentList.
 * @param {function} handleAddGarmentToList Function for adding a garment to the list 
 */
const Menu = ({ handleAddGarmentToList }) => {
    const [garments, setWardrobe] = useState([]);

    // Load the garments in the wardrobe(collection of saved garment objects)
    useEffect(() => {
        let arr = [];
        (async () => {
            arr = [...await getMiddleLayers()];
            arr = [...await getWardrobe()];
            setWardrobe(arr);
        })()
    }, [])

    return (
        <>
            <h3>Suggested outfit:</h3>
            <SuggestedOutfit handleAddGarmentToList={handleAddGarmentToList} />
            <h3>Your wardrobe:</h3>
            <IonList inset>

                {garments.map((garment) => {
                    const labelId = `wardrobe-list-label-${garment.name}`;
                    return (
                        <Garment handleAddGarmentToList={handleAddGarmentToList} key={labelId} garment={garment} />
                    )
                })}
            </IonList>
            <IonButton routerLink="/ManageGarments">My Garments</IonButton>
        </>
    );
}

export default Menu;