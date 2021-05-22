import { IonCheckbox, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { trash } from 'ionicons/icons';
import React from 'react';
import noImage from '../../images/noImage.png';
import frameOverlay from '../../images/imageOverlay.png'

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
        <IonList>
            {listOfGarments.map((garment) => {
                const labelId = `clothing-list-label-${garment.name}`;
                return (
                    <IonItem key={labelId}
                        style={{
                            '--padding-start': '8px',
                            '--inner-padding-end': '0px',
                            '--padding-end': '8px',
                            '--inner-padding-top': '12px',
                            '--inner-padding-bottom': '12px',
                        }}>
                        <IonCheckbox className="check" slot="end" />
                        <IonIcon
                            style={{
                                '--inner-padding-start': '0px',
                                '--padding-start': '0px',
                                '--inner-padding-end': '0px',
                                '--padding-end': '0px',
                            }}
                            icon={trash}
                            slot="end"
                            onClick={() => handleRemoveGarmentFromList(garment)}></IonIcon>
                        {garment.imgSrc === '' ?
                            < img id="chosen-image" src={noImage} />
                            :
                            <div style={{
                                width: '30vw',
                                height: '30vw',
                                position: 'relative',
                            }
                            }>
                                <img className="overlay" src={frameOverlay} />
                                <img id={garment.name + '-image'} src={garment.imgSrc} />
                            </div>
                        }
                        <IonLabel
                            style={{
                                marginLeft: '16px'
                            }}>
                            {garment.name}
                        </IonLabel>
                    </IonItem>
                )
            })}
        </IonList>
    );
}

export default List;