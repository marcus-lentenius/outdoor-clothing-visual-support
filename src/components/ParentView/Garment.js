import React from 'react'
import { IonGrid, IonRow, IonIcon, IonItem, IonLabel, IonCol, IonCard, IonCardContent, IonButton, IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonThumbnail, IonAvatar, IonItemDivider } from '@ionic/react';
import { snow, cloudy, leaf, rainy, sunny, trash, thermometer, arrowDown, arrowUndo, arrowUp, swapVertical } from 'ionicons/icons';
import noImage from '../../images/noImage.png';
import Thumbnail from './Thumbnail';

const style = {
    title: {
        fontSize: '20px',
    },
    icon: {
        fontSize: '18px',
    },
    center: {
        textAlign: 'center',
    },
    right: {
        textAlign: 'right',
    },
}

/**
 * Component showing the data of the garment
 * @param {object} object The garment to display
 */
//TODO: add alt prop to images
const Garment = ({ garment, handleRemoveGarment }) => {
    return (
        <IonCard>
            <Thumbnail src={garment.imgSrc} height='calc(100vw * 0.439)' />
            <IonCardHeader>
                <IonCardTitle style={style.title}>
                    {garment.name}
                </IonCardTitle>
            </IonCardHeader>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonIcon icon={arrowUp} /> {garment.tempMax}°C
                    </IonCol>
                    <IonCol style={style.right}>
                        <IonIcon icon={arrowDown} />{garment.tempMin}°C
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {garment.condition.map((condition) => {
                            //TODO: flytta till extern component
                            if (condition === 'snow') {
                                return (
                                    <IonIcon key={'icon-label-' + garment.name + '-' + condition}
                                        style={style.icon}
                                        icon={snow} />
                                );
                            }
                            if (condition === 'rain') {
                                return (
                                    <IonIcon key={'icon-label-' + garment.name + '-' + condition}
                                        style={style.icon}
                                        icon={rainy} />
                                );
                            }
                            if (condition === 'clear') {
                                return (
                                    <IonIcon key={'icon-label-' + garment.name + '-' + condition}
                                        style={style.icon}
                                        icon={sunny} />
                                );
                            }
                            if (condition === 'cloud') {
                                return (
                                    <IonIcon key={'icon-label-' + garment.name + '-' + condition}
                                        style={style.icon}
                                        icon={cloudy} />
                                );
                            }
                            if (condition === 'wind') {
                                return (
                                    <IonIcon key={'icon-label-' + garment.name + '-' + condition}
                                        style={style.icon}
                                        icon={leaf} />
                                );
                            }
                        })}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton size="small" routerLink={{
                            pathname: '/CreateGarment',
                            state: garment,
                        }}>Edit</IonButton>
                    </IonCol>
                    <IonCol style={style.right}>
                        <IonButton size="small" onClick={() => handleRemoveGarment(garment)} >
                            <IonIcon icon={trash} />
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>

                    </IonCol>
                </IonRow>
            </IonGrid>

        </IonCard>
    );
}

export default Garment;