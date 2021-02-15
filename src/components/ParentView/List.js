import { IonCheckbox, IonIcon, IonicSafeString, IonImg, IonItem, IonLabel, IonList } from '@ionic/react';
import { trash } from 'ionicons/icons';
import firebase from 'firebase'
import React, { useState } from 'react';
import noImage from '../../images/noImage.png'

/**
 * A list of all garments suggested for the day.
 * The garments will be available in a list 
 * with predefined garment objects with a few standard 
 * sets with the possibility to create custom 
 * garments and sets.
 * @param {Array} listOfGarments List of garment objects
 * @param {function} handleRemoveGarmentFromList Function for removing garment from the list
 */
const List = ({ listOfGarments, handleRemoveGarmentFromList }) => {
    return (
        <IonList inset>
            {listOfGarments.map((garment) => {
                const labelId = `clothing-list-label-${garment.name}`;
                return (
                    <IonItem key={labelId}>
                        <IonIcon
                            icon={trash}
                            slot="end"
                            onClick={() => handleRemoveGarmentFromList(garment)}></IonIcon>
                        {garment.imgSrc === '' ?
                            < img id="chosen-image" src={noImage} />
                            :
                            <img id="chosen-image" src={garment.imgSrc} />
                        }
                        <IonLabel>
                            {garment.name}
                        </IonLabel>
                        <IonCheckbox className="check" slot="start" />
                    </IonItem>
                )
            })}
        </IonList>
    );
}

export default List;