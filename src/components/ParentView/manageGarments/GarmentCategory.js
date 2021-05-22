import { IonCard, IonCardTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import noImage from '../../../images/noImage.png';
import Thumbnail from '../../shared/Thumbnail';


const GarmentCategory = ({ wardrobe, category, categoryName, setShowModal }) => {
const [src, setSrc] = useState(noImage);
    const style = {
        cardTitle: {
            fontSize: '16px',
            textAlign: 'center',
            margin: 10,
        },
    }


    useEffect(() => {
        const g = wardrobe.find(garment => garment.type === category);
        console.log("Log:  - useEffect - g", g)
        if(typeof g !== 'undefined'){
            setSrc(g.imgSrc);
        }
        // setGarment(g);
     }, [wardrobe]);

    return (
        <IonCard onClick={() => {
            setShowModal(true)
        }}>
            <Thumbnail src={src} height="calc(100vw * 0.24)" />
            <IonCardTitle style={style.cardTitle}>
                {categoryName}
            </IonCardTitle>
        </IonCard>
    );
}

export default GarmentCategory;