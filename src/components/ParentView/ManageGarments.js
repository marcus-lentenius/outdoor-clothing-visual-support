import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFabButton, IonGrid, IonFab, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonRow, IonThumbnail, IonToolbar } from '@ionic/react';
import { snow, sunny } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { addToWardrobe, getMiddleLayers, getWardrobe, removeFromWardrobe } from '../../scripts/wardrobe';
import { getWeatherCondition } from '../../scripts/weatherCondition';
import Garment from './Garment';
import noImage from '../../images/noImage.png'
import Thumbnail from './Thumbnail';
import { add, close, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';


/**
 * View for managing users wardrobe
 * Add, remove //TODO: and edit garments
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


    //TODO: extract
    const GarmentCategory = ({ categoryName, setShowModal }) => {
        return (
            <IonCard onClick={() => {
                setShowModal(true)
            }}>
                <Thumbnail src={noImage} height="calc(100vw * 0.24)" />
                <IonCardTitle style={style.cardTitle}>
                    {categoryName}
                </IonCardTitle>
            </IonCard>
        );
    }

    const style = {
        cardTitle: {
            fontSize: '16px',
            textAlign: 'center',
            margin: 10,
        },
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
    const Modal = ({ category, showModal, setShowModal }) => {
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
    return (
        <>
            <IonContent scrollY>
                <IonButton routerLink="/CreateGarment">New Garment</IonButton>
                <IonList>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <GarmentCategory categoryName={'Hats'} setShowModal={setShowHats} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory categoryName={'Jackets'} setShowModal={setShowJackets} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory categoryName={'Shell Trousers'} setShowModal={setShowShellTrousers} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <GarmentCategory categoryName={'Shoes'} setShowModal={setShowShoes} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory categoryName={'Gloves'} setShowModal={setShowGloves} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory categoryName={'Pants'} setShowModal={setShowPants} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <GarmentCategory categoryName={'Sweaters'} setShowModal={setShowSweaterCardigan} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory categoryName={'Scarves'} setShowModal={setShowScarves} />
                            </IonCol>
                            <IonCol>
                                <GarmentCategory categoryName={'Overalls'} setShowModal={setShowOveralls} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <GarmentCategory categoryName={'Other'} setShowModal={setShowOther} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonList>
                <Modal category={'hat'} showModal={showHats} setShowModal={setShowHats} />
                <Modal category={'jacket'} showModal={showJackets} setShowModal={setShowJackets} />
                <Modal category={'overall'} showModal={showOveralls} setShowModal={setShowOveralls} />
                <Modal category={'shellTrousers'} showModal={showShellTrousers} setShowModal={setShowShellTrousers} />
                <Modal category={'shoes'} showModal={showShoes} setShowModal={setShowShoes} />
                <Modal category={'gloves'} showModal={showGloves} setShowModal={setShowGloves} />
                <Modal category={'pants'} showModal={showPants} setShowModal={setShowPants} />
                <Modal category={'sweaterCardigan'} showModal={showSweaterCardigan} setShowModal={setShowSweaterCardigan} />
                <Modal category={'scarf'} showModal={showScarves} setShowModal={setShowScarves} />
                <Modal category={''} showModal={showOther} setShowModal={setShowOther} />

            </IonContent>
        </>
    )
}

export default ManageGarments;








// TEST AV VÄDER API

// {weatherCondition ?
//     <>
//         <IonItem><h1>TEST TEMP: {weatherCond.temperature}</h1></IonItem>
//         {wardrobe.map((garment) => {
//             const labelId = `clothing-list-label-${garment.name}`;

//             return (
//                     <TestTEmp key={labelId} garment={garment} />
//             )
//         })}
//     </>
//     :
//     <></>
// }
// {weatherCondition ?
//     <>
//         <IonItem><h1>TEST CONDITION: {weatherCond.condition}</h1></IonItem>
//         {wardrobe.map((garment) => {
//             const labelId = `clothing-list-label-${garment.name}`;

//             return (
//                     <TestCondition key={labelId} garment={garment} />
//             )
//         })}
//     </>
//     :
//     <></>
// }
// {weatherCondition ?
//     <>
//         <IonItem>
//             <h1>TEST WIND {weatherCond.windSpeed}</h1>
//         </IonItem>
//         {wardrobe.map((garment) => {
//             const labelId = `clothing-list-label-${garment.name}`;

//             return (
//                     <TestWind key={labelId} garment={garment} />
//             )
//         })}
//     </>
//     :
//     <></>
// }
// const weatherCond = {
//     temperature: 0,
//     condition: 'snow',
//     windSpeed: 9,
// }
// const TestTEmp = (garment) => {
//     if (garment.garment.tempMax > weatherCond.temperature && garment.garment.tempMin < weatherCond.temperature) {
//         return (
//             <>
//             <IonItem>
//                 <Garment garment={garment.garment} />
//             </IonItem>
//             </>
//         );
//     } else {
//         return (<></>);
//     }
// }

// const TestCondition = (garment) => {
//     if (garment.garment.condition.includes(weatherCond.condition)) {
//         return (
//             <>
//             <IonItem>
//                 <Garment garment={garment.garment} />
//             </IonItem>
//             </>
//         );
//     } else {
//         return (<></>);
//     }
// }

// const TestWind = (garment) => {
//     if (garment.garment.condition.includes('wind') && weatherCond.windSpeed > 6.5) {
//         return (
//             <>
//                 <IonItem>
//                     <Garment garment={garment.garment} />
//                 </IonItem>

//             </>
//         );
//     } else {
//         return (<></>);
//     }
// }
