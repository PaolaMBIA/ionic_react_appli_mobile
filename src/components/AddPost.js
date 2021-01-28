import React, { useState, useContext } from 'react';
import { UidContext } from "../UidContext";

import User from '../pages/Users';
//import MyHeaders from './Headers';

import { IonButton, IonContent,IonGrid, IonRow, IonCol, IonFab, IonItem, IonLabel, IonIcon, IonInput, IonCard, IonFabButton, IonToast } from '@ionic/react';
import { camera } from 'ionicons/icons';
import defaultImagePost from '../assets/defaultImagePost.png';

import firebase from "../firebaseConfig";

import { usePhotoGallery } from "../hooks/usePhotoGallery";


const AddPost = ({ setShowAddPost }) => {
    //const uid = useContext(UidContext);

    const [state, setState] = useState({ myAddPost: [] });

    const { takePhoto, photo } = usePhotoGallery();

    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [picturePost, setPicturePost] = useState("");
    const [showToast, setShowToast] = useState(false);
    
    function addPostHandler(opts) {
        

        const quotesDB = firebase.database().ref("posts");
        const quote = {
            uid: Math.random().toString(36).substr(2, 9),
            title,
            overview,
            picturePost, 
            timestamp: new Date().toISOString()
        };
    
        try {
            quotesDB.push(quote);
        
            setShowToast(true);
        } catch (err) {
            console.log(err)
        }


        setTitle("");
        setOverview("");
         setPicturePost("");
        
    }
    return (       
                <IonContent>
                    <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addPostHandler({  picturePost: picturePost, title: title, overview: overview});
                    }}
                    >
                    <IonGrid fixed>
                        <IonRow style={{ width: "100%" }}>
                        </IonRow>
                        <IonRow style={{ width: "100%" }}>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Titre de la publication</IonLabel>
                                    <IonInput
                                        required
                                        value={title}
                                        onIonChange={(e) => setTitle(e.detail.value)}
                                    ></IonInput>
                                    <IonLabel position="stacked">Description</IonLabel>
                                    <IonInput
                                        required
                                        value={overview}
                                    onIonChange={(e) => setOverview(e.detail.value)}
                                    type="textarea"
                                    ></IonInput>
                                    <IonLabel position="stacked">Ajouter une photo</IonLabel>
                                    {/* <IonCard >
                                    {
                                        photo.map(item => ( 

                                                    item.webviewPath ?
                                                <img src={item.webviewPath} alt="" />
                                                : <img src={defaultImagePost} alt="" />
                                                     
                                        ))
                                            
                                        }
                                    </IonCard>
                                    <IonFab vertical="bottom" horizontal="center" >
                                        <IonFabButton onClick={takePhoto}>
                                            <IonIcon icon={camera}></IonIcon>
                                        </IonFabButton>
                                    </IonFab>                                                      */}
                                    <IonInput
                                        required
                                        value={picturePost}
                                        onIonChange={(e) => setPicturePost(e.detail.value)}
                                    ></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow style={{ width: "100%" }}>
                            <IonCol>
                                <IonButton type="submit" size="small" >
                                  Ajouter
                                </IonButton>
                                <IonButton  color="danger" size="small" onClick={() => setShowAddPost(false)}>
                                  Annuler
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonToast
                            isOpen={showToast}
                            onDidDismiss={() => setShowToast(false)}
                            message="publication ajoutée, voulez-vous ajouter une nouvelle publication?"
                            position="top"                           
                            color="primary"
                        
                        buttons={[
                            {
                              side: 'start',
                              
                              text: 'oui',
                              handler: () => {
                                console.log('ajouter');
                              }
                            },
                            {
                              text: 'non',
                              role: 'cancel',
                              handler: () => {
                                setShowAddPost(false);
                              }
                            }
                          ]}
                        />
                    
                    </IonGrid>
                    <button type="submit"></button>
                    </form>
                
                </IonContent>
            



  );
};

export default AddPost;
