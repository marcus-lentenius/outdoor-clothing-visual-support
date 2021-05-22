import { IonButton, IonItem } from "@ionic/react";
import React from "react";
import noImage from '../../../images/noImage.png';

/**
 * Displays the image and name of a card and a button to add the garment
 */

const Garment = ({ garment, handleAddGarmentToList }) => {
    return (
        <IonItem>
            {garment.imgSrc ?
                <img id="chosen-image" src={garment.imgSrc} />
                :
                <img id="chosen-image" src={noImage} />
            }
            {garment.name}
            <IonButton slot="end" key={`add-garment-to-list-id-${garment.name}`}
                variant="contained"
                color="primary"
                onClick={() => {
                    handleAddGarmentToList(garment);
                }}>
                Add to the list
                    </IonButton>
        </IonItem>
    );
}

export default Garment;