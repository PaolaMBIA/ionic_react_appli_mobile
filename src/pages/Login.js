import { IonContent, IonPage, IonText } from '@ionic/react';
import React, { useState, useEffect } from 'react';

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import firebase from '../firebaseConfig';
import Home from './Home';


const Login = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccess: () => false,
        },
    };
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
          // !! ensure boolean
          setIsSignedIn(!!user);
          console.log(user);
        });
    }, []);
    

    return (
        <>
            {isSignedIn ? (
                <Home setIsSignedIn={ setIsSignedIn }/>
            ) : (
                    
                <IonPage>
                    <IonText>Authentification</IonText>
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                </IonPage>
            )}

        </>
    )
}

export default Login;