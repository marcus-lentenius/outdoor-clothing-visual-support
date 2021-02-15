import { IonButton, IonList, IonContent, IonGrid, IonImg, IonInput, IonItem, IonIcon, IonRow, IonSelect, IonSelectOption, IonCol, IonCard, IonCardHeader, IonCardContent, IonAlert, IonCheckbox, IonLabel, IonItemOption } from '@ionic/react';
import React, { useState } from 'react';
import { getStorageImages, saveImage, deleteImage } from '../../../scripts/storageImages';
import Header from '../../shared/Header';
import { addToWardrobe } from '../../../scripts/wardrobe';
import { Plugins, CameraResultType } from '@capacitor/core';
import noImage from '../../../images/noImage.png';
import Thumbnail from '../Thumbnail';
import { snow, cloudy, leaf, rainy, sunny, trash, thermometer, arrowDown, arrowUndo, arrowUp, swapVertical } from 'ionicons/icons';

const Condition = ({ ionIcon, state, setState }) => {
    const style = {

        icon: {
            fontSize: '32px',
            padding: '8px',
            margin: '6px',
            borderRadius: '10px',
        },
        checkBox: {
            marginRight: '5px',
        },
        ionItem: {
            '--padding-start': '0',
            '--inner-padding-start': '0px',
            '--inner-padding-end': '0px',
            '--border-style': 'none',
        },
    }
    
    if(state){
        style.icon.background = '#dedede';
    }else{
        style.icon.background = '';
    }


    return (
        <>
            <IonItem onClick={() => setState(!state)} style={style.ionItem}>
                <IonIcon style={style.icon} icon={ionIcon} />
                {/* <IonCheckbox
                    // onIonChange={() => setState(!state)}
                    checked={state}
                    slot="start"
                    style={style.checkBox} /> */}
            </IonItem>
        </>
    );
}

export default Condition;