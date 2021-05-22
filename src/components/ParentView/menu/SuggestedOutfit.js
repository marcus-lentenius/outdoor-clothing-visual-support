import { IonButton, IonCol, IonContent, IonGrid, IonLabel, IonRow, IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getSuggestions } from '../../../scripts/suggestGarments';
import { getWeatherCondition } from '../../../scripts/weatherCondition';
import { getMiddleLayers, getWardrobe } from '../../../scripts/wardrobe';

/**
 * Handles the sorting of suggested garments
 * and displays them in the menu
 */

const SuggestedOutfit = ({ handleAddGarmentToList }) => {
    const [garments, setGarments] = useState([]);
    const [middleLayers, setMiddleLayers] = useState([]);
    const [weatherCondition, setWeatherCondition] = useState();
    const [suggestedGarments, setSuggestedGarments] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Fetches all data and sorts them
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
        },
        button: {
            padding: 0,
            width: '120px',
            height: '120px'
        }
    }


    const Button = (props) => {
        return (
            <IonCol>
                <IonButton
                    color="light"
                    style={styles.button}
                    onClick={() => handleAddGarmentToList(props.garment)}>
                    {props.children}
                </IonButton>
            </IonCol>
        )
    }

    return (
        <>
            {weatherCondition ? <h3>{weatherCondition.condition} - {weatherCondition.temperature}°C</h3> : ''}

            <IonRow>
                {suggestedGarments.map((garment) => {
                    const key = 'suggested-garment-' + garment.name;
                    if (garment.innerLayer) {
                        return (
                            <IonCol key={key} >
                                <Button garment={garment}>
                                    <img style={styles.img} src={garment.imgSrc} />
                                </Button>
                                {/* {garment.innerLayer.map((innerLayer) => {
                                const key = 'suggested-inner-layer-' + innerLayer.name;
                                return (
                                    <Button key={key} garment={garment.innerLayer}>
                                        <img style={styles.img} src={innerLayer.imgSrc} />
                                    </Button>
                                )
                            })} */}
                            </IonCol>
                        );
                    } else {
                        return (
                            <IonCol>
                                <Button garment={garment}>
                                    <img style={styles.img} src={garment.imgSrc} />
                                </Button>
                            </IonCol>
                        );
                    }
                })}
            </IonRow>
        </>
    );
}

export default SuggestedOutfit;