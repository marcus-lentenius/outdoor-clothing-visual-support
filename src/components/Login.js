import React, { useState } from 'react'
import { IonApp, IonButton, IonInput, IonRouterOutlet } from '@ionic/react';
import { authenticate } from '../scripts/firebase'

const login = ({ handleSignIn }) => {
    const handleAuthenticate = async () => {
        handleSignIn(await authenticate());
    }

    handleAuthenticate();
    
    return (
        <>
            <IonButton onClick={() => handleAuthenticate()}>Sign in</IonButton>
        </>
    )
}

export default login;