import React from 'react';
import {  IonText, IonIcon } from '@ionic/react';
import { logInOutline } from 'ionicons/icons';

import { MyHeader, MyButton } from '../styledComponents/StyleHeader';

import firebase from '../firebaseConfig';
import { useHistory } from 'react-router';


const Headers = () => {

  function signOutHandler() {
    firebase.auth().signOut()
  }


  return (
    <MyHeader>
      <IonText className="myText">mboa-237</IonText>
      <IonText className="myMessage">Bienvenue <IonText className="myText"><strong>Paola</strong> </IonText> </IonText>
      <MyButton onClick={signOutHandler} >
        <IonIcon className="myIcon" icon={logInOutline} />
      </MyButton>
    </MyHeader>
  );
};

export default Headers;
