import { IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonList, IonRow } from '@ionic/react';
import { close } from 'ionicons/icons';
import React from 'react';
import Garment from './Garment';

const Modal = ({wardrobe, handleRemoveGarment, category, showModal, setShowModal }) => {
    
    const style = {
        modal: {
            top: 0,
            left: 0,
            position: 'absolute',
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: 'white',
        },
        modalCol: {
            minWidth: '50vw',
            padding: 0,
        },
        modalGrid: {
            padding: '5px 0 5px 0',
        },
        fabButton: {
            position: 'fixed',
            right: '10px',
        },
    }

    return (
        <>
            {showModal ?
                <div style={style.modal}>
                    <IonList>
                        <IonGrid style={style.modalGrid}>
                            <IonRow>
                                {wardrobe.map((garment) => {
                                    const labelId = `clothing-list-label-${garment.name}`;
                                    if (garment.type === category) {
                                        return (
                                            <IonCol style={style.modalCol} key={labelId}>
                                                <Garment garment={garment} handleRemoveGarment={handleRemoveGarment}></Garment>
                                            </IonCol>
                                        );
                                    } else if (category === '') {
                                        return (
                                            <IonCol style={style.modalCol} key={labelId}>
                                                <Garment garment={garment} handleRemoveGarment={handleRemoveGarment}></Garment>
                                            </IonCol>
                                        );
                                    }
                                }
                                )}
                            </IonRow>
                        </IonGrid>
                    </IonList>
                    <IonFab onClick={() => setShowModal(false)} style={style.fabButton} vertical="top" horizontal="end" slot="fixed">
                        <IonFabButton>
                            <IonIcon icon={close} />
                        </IonFabButton>
                    </IonFab>
                </div >
                : <></>}
        </>
    );
}

export default Modal;