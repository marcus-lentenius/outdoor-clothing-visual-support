import { IonButton, IonCol, IonContent, IonGrid, IonList, IonRow } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getWardrobe, removeFromWardrobe } from '../../../scripts/wardrobe';
import GarmentCategory from './GarmentCategory';
import Modal from './Modal';


/**
 * View for managing users wardrobe
 * Add, remove and edit garments
 */
const ManageGarments = ({ props }) => {

    /**
     * Check if the user is redirected from editing a garment in CreateGarment
     * If true set the showState corresponding to the type the user was editing
     */
    //TODO: evaluate if the feature is positive or negative
    useEffect(() => {
        try {
            if (props.history.location.state.redirected) {
                switch (props.history.location.state.type) {
                    case 'hat':
                        setShowHats(true);
                        break;
                    case 'jacket':
                        setShowJackets(true);
                        break;
                    case 'shellTrousers':
                        setShowShellTrousers(true);
                        break;
                    case 'shoes':
                        setShowShoes(true);
                        break;
                    case 'overall':
                        setShowOveralls(true);
                        break;
                    case 'gloves':
                        setShowGloves(true);
                        break;
                    case 'scarf':
                        setShowScarves(true);
                        break;
                    case 'pants':
                        setShowPants(true);
                        break;
                    case 'sweaterCardigan':
                        setShowSweaterCardigan(true);
                        break;
                }
            }
            // Clear the history to avoid showing a category if navigating back to ManageGarments
            window.history.replace(window.location.pathname, null);
        }
        catch (error) {
            // console.log(error);
        }
    }, [])

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [wardrobe, setWardrobe] = useState([])
    const [showHats, setShowHats] = useState()
    const [showJackets, setShowJackets] = useState()
    const [showShellTrousers, setShowShellTrousers] = useState()
    const [showShoes, setShowShoes] = useState()
    const [showGloves, setShowGloves] = useState()
    const [showPants, setShowPants] = useState()
    const [showSweaterCardigan, setShowSweaterCardigan] = useState()
    const [showScarves, setShowScarves] = useState()
    const [showOveralls, setShowOveralls] = useState()
    const [showOther, setShowOther] = useState()

    const loadData = async () => {
        setWardrobe(await getWardrobe());
    }

    if (!isDataLoaded) {
        loadData()
        setIsDataLoaded(true);
    }

    const handleRemoveGarment = async (garment) => {
        await removeFromWardrobe(garment);
        loadData();
    }

    return (
        <>
            <IonContent scrollY>
                <IonButton routerLink="/CreateGarment">New Garment</IonButton>
                <IonList>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe} category={'hat'} categoryName={'Hats'} setShowModal={setShowHats} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe} category={'jacket'}  categoryName={'Jackets'} setShowModal={setShowJackets} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe} category={'shellTrousers'}  categoryName={'Shell Trousers'} setShowModal={setShowShellTrousers} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe} category={'shoes'}  categoryName={'Shoes'} setShowModal={setShowShoes} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe} category={'gloves'}  categoryName={'Gloves'} setShowModal={setShowGloves} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe} category={'pants'}  categoryName={'Pants'} setShowModal={setShowPants} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe} category={'sweaterCardigan'}  categoryName={'Sweaters'} setShowModal={setShowSweaterCardigan} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe} category={'scarf'}  categoryName={'Scarves'} setShowModal={setShowScarves} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory wardrobe={wardrobe}  category={'overall'} categoryName={'Overalls'} setShowModal={setShowOveralls} />
                            </IonCol>
                        </IonRow>
                        {/* <IonRow>
                            <IonCol>
                                <GarmentCategory categoryName={'Other'} setShowModal={setShowOther} />
                            </IonCol>
                        </IonRow> */}
                    </IonGrid>
                </IonList>

                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'hat'} showModal={showHats} setShowModal={setShowHats} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'jacket'} showModal={showJackets} setShowModal={setShowJackets} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'overall'} showModal={showOveralls} setShowModal={setShowOveralls} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'shellTrousers'} showModal={showShellTrousers} setShowModal={setShowShellTrousers} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'shoes'} showModal={showShoes} setShowModal={setShowShoes} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'gloves'} showModal={showGloves} setShowModal={setShowGloves} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'pants'} showModal={showPants} setShowModal={setShowPants} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'sweaterCardigan'} showModal={showSweaterCardigan} setShowModal={setShowSweaterCardigan} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={'scarf'} showModal={showScarves} setShowModal={setShowScarves} />
                <Modal wardrobe={wardrobe} handleRemoveGarment={handleRemoveGarment} category={''} showModal={showOther} setShowModal={setShowOther} />

            </IonContent>
        </>
    )
}

export default ManageGarments;