import { IonButton, IonCol, IonContent, IonGrid, IonLabel, IonRow, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getSuggestions } from '../../scripts/suggestGarments';
import { getWeatherCondition } from '../../scripts/weatherCondition';
import { getMiddleLayers, getWardrobe } from '../../scripts/wardrobe';

const SuggestedOutfit = ({ handleAddGarmentToList }) => {
    const [garments, setGarments] = useState([]);
    const [middleLayers, setMiddleLayers] = useState([]);
    const [weatherCondition, setWeatherCondition] = useState();
    const [suggestedGarments, setSuggestedGarments] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setGarments(await getWardrobe());
            setMiddleLayers(await getMiddleLayers());
            setWeatherCondition(await getWeatherCondition());
            setIsDataLoaded(true);
        }
        if (!isDataLoaded) {
            fetchData();

        } else {
            setSuggestedGarments(
                getSuggestions(weatherCondition, middleLayers, garments));
        }
    }, [isDataLoaded])

    const styles = {
        img: {
            height: '100px',
        }
    }

    return (
        <IonRow>
            {suggestedGarments.map((garment) => {
                const key = 'suggested-garment-' + garment.name;
                if (garment.innerLayer) {
                    return (
                        <div key={key} >
                            <IonCol>
                                <IonButton key={key}
                                    color="light"
                                    style={{ padding: 0, width: '120px', height: '120px' }}
                                    onClick={() => handleAddGarmentToList(garment)}>
                                    <img height="100px" src={garment.imgSrc} />
                                </IonButton>
                            </IonCol>
                            {garment.innerLayer.map((innerLayer) => {
                                const key = 'suggested-inner-layer-' + innerLayer.name;
                                return (
                                    <IonCol>
                                        <IonButton key={key}
                                            color="light"
                                            style={{ padding: 0, width: '120px', height: '120px' }}
                                            onClick={() => handleAddGarmentToList(garment)}>
                                            <img height="100px" src={innerLayer.imgSrc} />
                                        </IonButton>
                                    </IonCol>
                                )
                            })}
                        </div>
                    );
                } else {
                    return (
                        <IonCol>
                            <IonButton key={key}
                                color="light"
                                style={{ padding: 0, width: '120px', height: '120px' }}
                                onClick={() => handleAddGarmentToList(garment)}>
                                <img height="100px" src={garment.imgSrc} />
                            </IonButton>
                        </IonCol>
                    );
                }
            })}
        </IonRow>
    );
}

export default SuggestedOutfit;