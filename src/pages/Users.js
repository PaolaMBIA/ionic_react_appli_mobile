import React, { useState, useEffect } from 'react';
import { IonAvatar, IonCol, IonContent, IonGrid, IonPage, IonRow, IonText,  IonIcon } from '@ionic/react';
import MyHeaders from '../components/Headers';

import AddPost from '../components/AddPost';

import styled from 'styled-components';

import defaultImage from '../assets/defaultImage.png';

import { cameraOutline, pencilOutline, addCircleOutline } from 'ionicons/icons';
import { usePhotoGallery } from "../hooks/usePhotoGallery";

export const MyUserPage = styled(IonPage)`
    
    .myContent{
       // --background: #EAE7E2;
        display: flex;
        justify-content: space-between;
    }

    .myRowAvatar{
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #cccccc;
      height: 170px;
    }

    .myColPseudo{
      margin-left: 30px;
      padding-top: 60px;
      
    }

    .myAvatar{
      width: 90px;
      height: 90px;
    }

    .myIcon{

      font-size: 25px;
    }

    .myAddIcon{
      font-size: 25px;
      color: blue;
    }

    .myGridAvatar{
      align-items: center;
      margin: 20px;
    }

    .myAddRow{
      padding-left: 20px;
    }
`;

const User = () => {
  const { takePhoto, photo } = usePhotoGallery();
  const [showAddPost, setShowAddPost] = useState(false);

  useEffect(() => {
    const search = photo.map(element => JSON.stringify(element.filepath));
    fetch(`http://localhost:4000/upload/`, {
      method: 'post',
      })
      .then(response => response.json())
      .then(json => console.log(json))   
    
    console.log(photo.map(element => JSON.stringify(element.filepath)).toString())
        
  }, [photo])

  function addPostHandler() {
    
    setShowAddPost(true);
  }


  return (
    <MyUserPage>
      <MyHeaders />
      {
        showAddPost ?
        <AddPost setShowAddPost={setShowAddPost} />

        : <IonContent className="myContent">
            <IonGrid className="myGridAvatar">
            <IonRow className="myRowAvatar">
              <IonCol className="myColAvatar" size="5" >
                <IonAvatar className="myAvatar" >
                  {
                    photo.map(item => (
                      item.webviewPath ?
                        <img src={item.webviewPath} alt=""/>
                        : <img src={defaultImage} alt=""/>
                    ))
                  }
                </IonAvatar>
                <IonIcon className="myIcon" icon={cameraOutline} onClick={takePhoto} />
              </IonCol>
              <IonCol className="myColPseudo" size="5">
                <IonText>Paola</IonText>
                <IonIcon className="myIcons" icon={pencilOutline} />
              </IonCol>          
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow className="myAddRow">
              <IonCol size="1">
                <IonIcon className="myAddIcon" icon={addCircleOutline} onClick={ addPostHandler}/>
              </IonCol>
              <IonCol size="10">
                <IonText>Ajouter une nouvelle pubication</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      }
    </MyUserPage>
  );
};

export default User;
