import React, {useState} from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonImg, IonText, IonIcon, IonGrid, IonRow, IonCol, IonAvatar, IonButton, IonToast } from '@ionic/react';

import defaultImagePost from '../assets/defaultImagePost.png';
import defaultImage from '../assets/defaultImage.png';

import firebase from "../firebaseConfig";

import { chatbubbleEllipsesOutline, heartOutline } from 'ionicons/icons';

export const Card = ({item, index}) => {
    const [showComments, setShowComments] = useState(false);
    const [showToast, setShowToast] = useState(false);

    function commentHandler() {
        setShowComments(showComments =>!showComments);
    };


    const deletePostHandler = () => {
        // pointer id de l'élement à delete
        let removePost = firebase.database().ref("posts").child(item.id);
    
        removePost.remove();
      };

    return (
        <IonCard className="myTool" key={index}>
                            <IonToast
                            isOpen={showToast}
                            onDidDismiss={() => setShowToast(false)}
                            message="voulez-vous vraiment supprimer la publication?"
                            position="top"                           
                            color="primary"
                        
                            buttons={[
                                {
                                side: 'start',
                                
                                text: 'oui',
                                handler: () => {
                                    deletePostHandler();
                                }
                                },
                                {
                                text: 'non',
                                role: 'cancel',
                                handler: () => {
                                    console.log("noon");
                                }
                                }
                            ]}/>
                            
                        <IonCardHeader className="myCardHeader">
                            <IonAvatar className="myTitleImage">
                                {
                                    item.pictureProfil ?
                                        <img src={item.pictureProfil} alt="" />
                                        : <img src={defaultImage} alt=""/>
                                }                                 
                            </IonAvatar>
                            <IonCardTitle>{item.pseudo}</IonCardTitle>
                            <IonText className="myTimeStamp">{ item.timestamp}</IonText>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonCard>
                                {
                                    item.picturePost ?
                                        <IonImg src={item.picturePost} alt=""/>
                                        : <img src={defaultImagePost} alt="" />
                                }
                            </IonCard>
                            <IonCardSubtitle className="myCardSubtitle">{ item.title }</IonCardSubtitle>
                        </IonCardContent>
                        <IonGrid className="myTextOverview">
                            <IonText className="myIonText" >{item.overview}</IonText>
                            <IonButton onClick={() => setShowToast(true)} color="danger">Effacer la publication</IonButton>
                        </IonGrid>
                        <IonGrid className="myBottomTool">
                            <IonRow className="myBottomIcon">
                                <IonCol size="2">
                                    <IonIcon
                                        className="myIcons"
                                        icon={chatbubbleEllipsesOutline}
                                        onClick={commentHandler}
                                    />
                                    <IonText className="myTextIcon">{ item.numberComments }</IonText> 
                                </IonCol>
                                <IonCol size="2">
                                    <IonIcon className="myIcons" icon={heartOutline} />
                                    <IonText className="myTextIcon">{item.likes}</IonText>
                                </IonCol>
                            </IonRow>
                            {
                                showComments &&
                                item.comments.map((element, index) => (
                                    <IonRow key={index}>
                                        <IonAvatar className="myCommentImage">
                                            {
                                                item.pictureProfil ?
                                                    <img src={item.pictureProfil} alt="" />
                                                    : <img src={defaultImage} alt="" />
                                            }                                           
                                        </IonAvatar>
                                        
                                        <IonRow className="myCommentsRow">
                                            <IonCol>
                                                <IonRow>
                                                    <IonCol className="myRowTitle">
                                                        <IonText color="dark">{element.pseudoComment}</IonText>
                                                        <IonText className="styleText">{ element.timestamp}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonText>{ element.text}</IonText>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    </IonRow>                               
                                ))
                            }
                        </IonGrid>
                    </IonCard>
    )
}