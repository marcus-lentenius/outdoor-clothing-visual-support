import { IonButton, IonCol, IonContent, IonRadio, IonRow } from "@ionic/react";
import { IonCheckbox, IonIcon, IonicSafeString, IonImg, IonItem, IonLabel, IonList } from '@ionic/react';
import noImage from '../../images/noImage.png'

import React, { useEffect, useState } from "react";
import { getMiddleLayers, getWardrobe } from '../../scripts/wardrobe';
import { getWeatherCondition } from "../../scripts/weatherCondition";
import SuggestedOutfit from "./SuggestedOutfit";

/**
 * This is the view of the users saved garments. 
 * It provides a list of the saved garments and buttons to 
 * add them to the GarmentList.
 * @param {function} handleAddGarmentToList Function for adding a garment to the list 
 */
const Wardrobe = ({ handleAddGarmentToList }) => {
    const [wardrobe, setWardrobe] = useState([]);

    // Load the garments in the wardrobe(collection of saved garment objects)
    useEffect(() => {
        let garments = [];
        (async () => {
            garments = [...await getMiddleLayers()];
            garments = [...await getWardrobe()];
            setWardrobe(garments);
        })()
    }, [])

    //TODO: Extract
    const Garment = (garment) => {
        return (
            <IonItem>
                {garment.garment.imgSrc ?
                    <img id="chosen-image" src={garment.garment.imgSrc} />
                    :
                    <img id="chosen-image" src={noImage} />
                }
                {garment.garment.name}
                <IonButton slot="end" key={`add-garment-to-list-id-${garment.garment.name}`}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleAddGarmentToList(garment.garment);
                    }}>
                    Add to the list
                        </IonButton>
            </IonItem>
        );
    }

    return (
        <>
            <h3>Suggested outfit:</h3>
            <SuggestedOutfit handleAddGarmentToList={handleAddGarmentToList}/>
            <h3>Your wardrobe:</h3>
            <IonList inset>

                {wardrobe.map((garment) => {
                    const labelId = `wardrobe-list-label-${garment.name}`;
                    return (
                        <Garment key={labelId} garment={garment} />
                    )
                })}
            </IonList>
            <IonButton routerLink="/ManageGarments">My Garments</IonButton>
        </>
    );
}

export default Wardrobe;