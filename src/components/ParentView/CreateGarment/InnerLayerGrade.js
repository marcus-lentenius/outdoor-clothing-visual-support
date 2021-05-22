import { IonButton, IonList, IonContent, IonGrid, IonImg, IonInput, IonItem, IonIcon, IonRow, IonSelect, IonSelectOption, IonCol, IonCard, IonCardHeader, IonCardContent, IonAlert, IonCheckbox, IonLabel, IonItemOption, IonRadioGroup, IonRadio } from '@ionic/react';
import React, { useState } from 'react';
import { getStorageImages, saveImage, deleteImage } from '../../../scripts/storageImages';
import Header from '../../shared/Header';
import { addToWardrobe } from '../../../scripts/wardrobe';
import { Plugins, CameraResultType } from '@capacitor/core';
import noImage from '../../../images/noImage.png';
import Thumbnail from '../../shared/Thumbnail';
import { reorderTwo, reorderThree, remove, cloudy, leaf, rainy, sunny, trash, thermometer, arrowDown, arrowUndo, arrowUp, swapVertical } from 'ionicons/icons';


const InnerLayerGrade = ({ state, setState }) => {
    const style = {
        icon: {
            fontSize: '32px',
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

    return (
        <>
                <IonRadioGroup onIonChange={(e) => setState(e.detail.value)}>

                    <IonItem style={style.ionItem}>
                        <IonRadio value="5" />
                        <IonIcon icon={reorderThree} />
                    </IonItem>

                    <div style={style.itemDivider} />

                    <IonItem style={style.ionItem}>
                        <IonRadio value="2.5" />
                        <IonIcon icon={reorderTwo} />
                    </IonItem>
                    <div style={style.itemDivider} />

                    <IonItem style={style.ionItem}>
                        <IonRadio value="1" />
                        <IonIcon icon={remove} />
                    </IonItem>
                </IonRadioGroup>
        </>
    );
}

export default InnerLayerGrade;