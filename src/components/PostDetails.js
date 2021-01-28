import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonImg, IonText, IonIcon, IonGrid, IonRow, IonCol, IonAvatar, IonPage, IonButton} from '@ionic/react';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import MyHeaders from '../components/Headers';

import defaultImagePost from '../assets/defaultImagePost.png';
import defaultImage from '../assets/defaultImage.png';


import { chatbubbleEllipsesOutline, heartOutline } from 'ionicons/icons';

import firebase from "../firebaseConfig";

import { useHistory } from 'react-router';

import { Card } from './Card';

const PostDetails = () => {
    const { postId } = useParams();
    const [allPosts, setAllPosts] = useState({ myAllPosts: [] });

    const history = useHistory();

    const backToPageBeforeHandler = ()=> {
        //console.log(postId,'u')
        history.push(`/Search`)
    }

    useEffect(() => {
        const quotesDB = firebase.database().ref("posts").child(postId);

        quotesDB.on("value", (snapshot) => {
            console.log(snapshot.val());

            setAllPosts({ myAllPosts: [snapshot.val()] });
            console.log(allPosts.myAllPosts);
        });

    }, []);
    
    //const filteredEnter = allPosts.myAllPosts.filter((element) => element.id === postId);

    //setAllPosts({myAllPosts: filteredEnter})

    //console.log(postId);

    return (
        <IonPage>
            <MyHeaders />
            <IonContent>
                {
                    allPosts.myAllPosts.map((item,index)=>
                    <IonCard className="myTool" key={index}>
                        <IonCardHeader className="myCardHeader">
                            <IonAvatar className="myTitleImage">
                             
                                         <img src={defaultImage} alt="" />
                                
                            </IonAvatar>
                            <IonCardTitle>{item.pseudo}</IonCardTitle>
                            <IonText className="myTimeStamp">{item.timestamp}</IonText>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonCard>
                                {
                                    item.picturePost ?
                                        <IonImg src={item.picturePost} alt="" />
                                        : <img src={defaultImagePost} alt="" />
                                }
                            </IonCard>
                            <IonCardSubtitle className="myCardSubtitle">{item.title}</IonCardSubtitle>
                        </IonCardContent>
                        <IonGrid className="myTextOverview">
                            <IonText className="myIonText" >{item.overview}</IonText>
                        </IonGrid>
                        <IonGrid className="myBottomTool">
                            <IonRow className="myBottomIcon">
                                <IonCol size="2">
                                    <IonIcon
                                        className="myIcons"
                                        icon={chatbubbleEllipsesOutline}
                                    //onClick={commentHandler}
                                    />
                                    <IonText className="myTextIcon">{item.numberComments}</IonText>
                                </IonCol>
                                <IonCol size="2">
                                    <IonIcon className="myIcons" icon={heartOutline} />
                                    <IonText className="myTextIcon">{item.likes}</IonText>
                                </IonCol>
                            </IonRow>
                            {/* {
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
                            } */}
                        </IonGrid>
                    </IonCard>
                    )}
                <IonButton onClick={backToPageBeforeHandler}>Retour</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default PostDetails;