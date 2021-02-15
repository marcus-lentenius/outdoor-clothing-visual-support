import { IonButton, IonList, IonContent, IonGrid, IonImg, IonInput, IonItem, IonIcon, IonRow, IonSelect, IonSelectOption, IonCol, IonCard, IonCardHeader, IonCardContent, IonAlert, IonCheckbox, IonLabel, IonItemOption, IonRadioGroup, IonRadio } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getStorageImages, saveImage, deleteImage } from '../../../scripts/storageImages';
import Header from '../../shared/Header';
import { addToWardrobe } from '../../../scripts/wardrobe';
import { Plugins, CameraResultType } from '@capacitor/core';
import noImage from '../../../images/noImage.png';
import Thumbnail from '../Thumbnail';
import { snow, cloudy, leaf, rainy, sunny, accessibility, arrowUndo, arrowUp, swapVertical, cloud, list, shirt } from 'ionicons/icons';


const InnerLayerType = ({ state, setState }) => {

    // useEffect(() => {
    //     switch (state) {
    //         case 'shirt':
    //             setIsShirt(true);

    //             if (isPants) {
    //                 setIsPants(false);
    //             }
    //             break;
    //         case 'pants':
    //             setIsPants(true);

    //             if (isPants) {
    //                 setIsShirt(false);
    //             }
    //     }
    // }, [state])

    const style = {
        icon: {
            fontSize: '32px',
            padding: '8px',
            margin: '6px',
            borderRadius: '10px',
        },
        shirt: {

        },
pants:{
    
},
        checkBox: {
            marginRight: '5px',
        },
        ionItem: {
            display: 'inline-block',
            '--padding-start': '0',
            '--inner-padding-start': '0px',
            '--inner-padding-end': '0px',
            '--border-style': 'none',
        },
        itemDivider: {
            display: 'inline-block',
            width: '1px',
            height: '60%',
            borderRight: '1px solid rgb(222 222 222)',
            paddingRight: '5px',
            margin: '0px 5px',
        },
    }

    if (state === 'shirt') {
        style.shirt.background = '#dedede';
        style.pants.background = '';
    } else if (state === 'pants') {
        style.pants.background = '#dedede';
        style.shirt.background = '';
    }
    
    return (
        <>
            <IonItem
                style={style.ionItem}
                onClick={() => {
                    setState('shirt');
                }}>
                <IonIcon
                    style={{...style.icon, ...style.shirt}}
                    icon={shirt} />
            </IonItem>

            <div style={style.itemDivider} />

            <IonItem
                style={style.ionItem}
                onClick={() => {
                    setState('pants');
                }} >
                <IonIcon
                    style={{...style.icon, ...style.pants}}
                    icon={accessibility} />
            </IonItem>
        </>
    );
}

export default InnerLayerType;