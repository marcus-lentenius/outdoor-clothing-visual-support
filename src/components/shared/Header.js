import React from 'react'
import { IonButton, IonContent, IonHeader, IonMenu, IonMenuButton, IonToolbar } from "@ionic/react";

/**
 * App header
 */
const Header = () => {
    return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonMenuButton slot="start" color="secondary" />
                <IonButton routerLink="/ParentView">List of Garments</IonButton>
                <IonButton routerLink="/ManageGarments">My Garments</IonButton>
                <IonButton routerLink="/UserView">UserView</IonButton>
                <IonButton routerLink="/TestApi">TestApi</IonButton>
            </IonToolbar>
        </IonHeader>
    );
}

export default Header;