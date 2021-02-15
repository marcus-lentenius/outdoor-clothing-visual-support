import { IonCheckbox, IonCol, IonGrid, IonItem, IonList, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import { getGarments } from '../../scripts/garmentList';
import './UserView.css';
import checkMarkOverlay from '../../images/check.png'
import frameOverlay from '../../images/imageOverlay.png'
import noImage from '../../images/noImage.png'

const UserView = () => {
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

    // Places a check mark overlay over the clicked image
    const checkImage = (e) => {
        e.target.classList.toggle('hidden');
    }
    
    return (
        <>
            <IonGrid>
                <IonRow>
                    {listOfGarments.map((garment) => {
                        const labelId = `clothing-list-label-${garment.name}`;
                        return (
                            <IonCol key={labelId}>
                                <div className="container">
                                    <img className="overlay" src={frameOverlay} />
                                    <img id={garment.name + '-image'} src={garment.imgSrc} />
                                    <img onClick={(e) => checkImage(e)} src={checkMarkOverlay} className="overlay hidden" />
                                </div>
                            </IonCol>
                        )
                    })}
                </IonRow>
            </IonGrid>
        </>
    )
}

export default UserView;