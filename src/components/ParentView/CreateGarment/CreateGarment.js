import { IonButton, IonList, IonContent, IonGrid, IonImg, IonInput, IonItem, IonIcon, IonRow, IonSelect, IonSelectOption, IonCol, IonCard, IonCardHeader, IonCardContent, IonAlert, IonCheckbox, IonLabel, IonItemOption } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getStorageImages, saveImage, deleteImage } from '../../../scripts/storageImages';
import Header from '../../shared/Header';
import { addToWardrobe, updateGarment, addToMiddleLayers } from '../../../scripts/wardrobe';
import { Plugins, CameraResultType } from '@capacitor/core';
import noImage from '../../../images/noImage.png';
import Thumbnail from '../Thumbnail';
import { snow, cloudy, leaf, rainy, sunny, accessibility, arrowUndo, arrowUp, swapVertical, cloud, list, shirt } from 'ionicons/icons';
import Condition from './Condition';
import ImageBank from './ImageBank';
import InnerLayerGrade from './InnerLayerGrade';
import { useHistory } from 'react-router';
import InnerLayerType from './InnerLayerType';


const CreateGarment = ({ props }) => {
    const history = useHistory({}); // For rediretions
    //TODO: Check if all needs to be states
    const [isDataLoaded, setIsDataLoaded] = useState(false);  // Condition for loading data when mounting
    const [listOfImages, setListOfImages] = useState([]);  // List of the images from firestore storage
    const [chosenImage, setChosenImage] = useState('');  // image shown in the form and sets its url as a prop in the garment object
    const [inUpdate, setInUpdate] = useState(false); // If inUpdate is true the garment will be updated instead of created
    const [innerLayerGrade, setInnerLayerGrade] = useState(); // Warmth grade for inner layer garments
    const [innerLayerType, setInnerLayerType] = useState(); // Warmth grade for inner layer garments
    const [garment, setGarment] = useState({ // The garment to be created or updated
        name: '',
        type: 'innerLayer',
        tempMax: '',
        tempMin: '',
        condition: [],
        imgSrc: '',
    });

    // If true the condition icon will be checked
    const [snowState, setSnowState] = useState(false);
    const [rainState, setRainState] = useState(false);
    const [cloudState, setCloudState] = useState(false);
    const [clearState, setClearState] = useState(false);
    const [windState, setWindState] = useState(false);

    // Access to the camera on a smartphone //TODO: only android?
    const { Camera } = Plugins;

    /**
     * Checks if the user was redirected from /ManageGarment(Garment component) 
     * If true it will fill the form with the information from the garment
     */
    useEffect(() => {
        try {
            if (props.history.location.state) {
                //TODO: testa utan spread
                setGarment({ ...props.history.location.state });
            }

            if (props.history.location.state.condition.includes('snow') && !snowState) {
                setSnowState(true);
            }
            if (props.history.location.state.condition.includes('clear') && !clearState) {
                setClearState(true);
            }
            if (props.history.location.state.condition.includes('cloud') && !cloudState) {
                setCloudState(true);
            }
            if (props.history.location.state.condition.includes('rain') && !rainState) {
                setRainState(true);
            }
            if (props.history.location.state.condition.includes('wind') && !windState) {
                setWindState(true);
            }
            if (props.history.location.state.condition.includes('snow') && !snowState) {
                setSnowState(true);
            }

            setChosenImage(props.history.location.state.imgSrc);

            if (!inUpdate) {
                setInUpdate(true);
            }

            // Clear the history to avoid going into inEdit if navigating back to CreateGarment from elsewhere
            window.history.replace(window.location.pathname, null);

        } catch (error) {
            // console.log(error);
        }
    }, [inUpdate])


    //TODO: move to a export function?
    //TODO: Set comment
    const loadImages = async () => {
        setListOfImages(await getStorageImages());
    }

    if (!isDataLoaded) {
        loadImages();
        setIsDataLoaded(true);
    }

    /* 
    * 
    */
    /**
     * Sets the image url for the creation of the garment
     * which will be used as a reference to display the image
     * Sets the image in the form to show which image is selected
     * @param {string} url The url of the image
     */
    const chooseImage = (url) => {
        setChosenImage(url);
    }

    /**
     * Creates a garment object from the data in the form
     * and adds it to the wardrobe or updates an existing garment
     * @param {Element} e The form
     */
    //TODO: remove 'handle'? Check naming conventions
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (garment.type === 'innerLayer') {

            const innerLayerGarment = {
                imgSrc: chosenImage,
                type: innerLayerType,
                name: garment.name,
                temperatureCompensation: innerLayerGrade,
            }

            setGarment(innerLayerGarment);

            await addToMiddleLayers(innerLayerGarment);   // Creates a document with the garment in firestore
        } else {
            const conditions = [];

            //TODO: Refactor
            if (snowState) {
                conditions.push('snow');
            }
            if (rainState) {
                conditions.push('rain');
            }
            if (windState) {
                conditions.push('wind');
            }
            if (clearState) {
                conditions.push('clear');
            }
            if (cloudState) {
                conditions.push('cloud');
            }

            garment.condition = conditions;
            garment.imgSrc = chosenImage;

            if (inUpdate) {
                await updateGarment(props.history.location.state, garment); // Updates the garment

                // Redirect to /ManageGarments with the type to display the garment //TODO: inlcude scroll?
                history.push({
                    pathname: '/ManageGarments',
                    state: {
                        type: garment.type,
                        redirected: true,
                    }
                })
            } else {
                await addToWardrobe(garment);   // Creates a document with the garment in firestore

                // Redirect to /ManageGarments with the type to display the garment
                // history.push({
                //     pathname: '/ManageGarments',
                //     state: {
                //         type: garment.type,
                //         redirected: true,
                //     }
                // });
            }
        }
    }

    /**
     * Use the phones camera to take a image
     * which will be used as a icon for the garment
     * and save the image to firebase storage
     */
    const takePicture = async () => {

        const capturedImage = await Camera.getPhoto( // Access the camera or gallery (Android) 
            {
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri,
                width: 300,
            }
        );

        const imageUrl = await saveImage(capturedImage);    // Upload the image to firebase storage

        setChosenImage(imageUrl);

        loadImages();   // Reload the list of images from firebase storage
    }

    const style = {
        itemDivider: {
            width: '1px',
            height: '60%',
            borderRight: '1px solid rgb(222 222 222)',
            margin: '0px 5px',
        },
    }

    return (
        <IonContent scrollY>
            <form onSubmit={(e) => {
                handleSubmit(e);
            }} noValidate autoComplete="off">
                <IonList>

                    {/* Displays the image and buttons for taking a picture or removing the chosen image */}
                    <IonItem >
                        <Thumbnail clickEvent={chooseImage} eventParameter={noImage} src={chosenImage} height={100} width={100} />
                        <IonButton onClick={() => takePicture()}>Take a picture</IonButton>
                        <IonButton onClick={() => { setChosenImage('') }}>Remove picture</IonButton>
                    </IonItem>

                    {/* Name input */}
                    <IonItem>
                        <IonInput
                            name="name"
                            value={garment.name}
                            placeholder="Gula jackan"
                            onIonChange={e => garment.name = e.detail.value} />
                    </IonItem>

                    {/* Select list of the garment types to choose from */}
                    <IonItem>
                        <IonSelect
                            value={garment.type}
                            name="type"
                            interface="popover"
                            placeholder="Type"
                            onIonChange={(e) => {
                                garment.type = e.detail.value;
                                setGarment({ ...garment });
                            }}>
                            <IonSelectOption value="innerLayer">Inner layer</IonSelectOption>
                            <IonSelectOption value="jacket">Jacket</IonSelectOption>
                            <IonSelectOption value="hat">Hat</IonSelectOption>
                            <IonSelectOption value="gloves">Gloves</IonSelectOption>
                            <IonSelectOption value="shoes">Shoes</IonSelectOption>
                            <IonSelectOption value="pants">Pants</IonSelectOption>
                            <IonSelectOption value="sweaterCardigan">Sweater/Cardigan</IonSelectOption>
                            <IonSelectOption value="shellTrousers">Shell trousers</IonSelectOption>
                            <IonSelectOption value="overall">Overall</IonSelectOption>
                            <IonSelectOption value="scarf">Scarf</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    {/* Renders different specifications to set depending on what type of garment the user choose */}

                    {garment.type === 'innerLayer' ?
                        <>
                            <IonItem>
                                <InnerLayerGrade state={innerLayerGrade} setState={setInnerLayerGrade} />
                            </IonItem>
                            <IonItem>
                                <InnerLayerType state={innerLayerType} setState={setInnerLayerType} />
                            </IonItem>
                        </>
                        :
                        <>
                            {/* Maximum temperature input */}
                            < IonItem >
                                <IonInput
                                    type="number"
                                    name="tempMax"
                                    placeholder="10"
                                    value={garment.tempMax}
                                    onIonChange={e => garment.tempMax = e.detail.value} />

                            </ IonItem>
                            {/* Minimum temperature input */}
                            <IonItem>
                                <IonInput value={garment.tempMin} onIonChange={e => garment.tempMin = e.detail.value} type="number" name="tempMin" placeholder="-5" />
                            </IonItem>

                            {/* Displays icons for choosing what weather condition the garment is suited for */}
                            <IonItem>
                                <Condition ionIcon={snow} state={snowState} setState={setSnowState} />
                                <div style={style.itemDivider} />
                                <Condition ionIcon={rainy} state={rainState} setState={setRainState} />
                                <div style={style.itemDivider} />
                                <Condition ionIcon={sunny} state={clearState} setState={setClearState} />
                                <div style={style.itemDivider} />
                                <Condition ionIcon={cloudy} state={cloudState} setState={setCloudState} />
                                <div style={style.itemDivider} />
                                <Condition ionIcon={leaf} state={windState} setState={setWindState} />
                            </IonItem>
                        </>
                    }
                </IonList>

                {/* Displays 'Create Garment' / 'Update' button depending of inUpdate state */}
                {inUpdate ?
                    // <IonButton type="submit" routerLink={{
                    //     pathname: '/ManageGarments',
                    //     state: {
                    //         type: garment.type,
                    //         redirected: true,
                    //     },
                    // }}>Update</IonButton>
                    <IonButton type="submit">Update</IonButton>
                    :
                    // <IonButton routerLink="/ManageGarments" type="submit">
                    <IonButton type="submit">
                        Create Garment
                    </IonButton>
                }

                {/* Display the image bank */}
                <IonGrid>
                    <IonRow>
                        <ImageBank loadImages={loadImages} setChosenImage={setChosenImage} chooseImage={chooseImage} listOfImages={listOfImages} />
                    </IonRow>
                </IonGrid>
            </form>
        </IonContent >
    );
}

export default CreateGarment;