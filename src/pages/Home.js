import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonImg, IonText,IonIcon, IonGrid, IonRow, IonCol, IonAvatar } from '@ionic/react';
import MyHeaders from '../components/Headers';

import defaultImage from '../assets/defaultImage.png';
import imageTest from '../assets/nkolandom.PNG';
import kola from '../assets/kola.PNG';

import firebase from "../firebaseConfig";

import { MyHomePage } from '../styledComponents/StyleHome';

import { Card } from '../components/Card';

const post = [
    {
        pictureProfil: defaultImage,
        pseudo: "Kimy",
        picturePost: imageTest,
        title: "Centre touristique de Nkolandom",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [{
            pseudoComment: "Bea",
            text: "super endroit",
            timeStamp: "20/06/2020"
        }],
        numberComments: 1,
        likes: 6,
        timeStamp: "20/05/2020"
    },
    {
        pictureProfil: defaultImage,
        pseudo: "Bea",
        picturePost: kola,
        title: "Les gorges de Kola",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [{
            pseudoComment: "Kimy",
            text: "facile d'accès?",
            timeStamp: "20/06/2020"
        }, {
            pseudoComment: "Bea",
            text: "oui",
            timeStamp: "20/06/2020"
        }],
        numberComments: 2,
        likes: 3,
        timeStamp: "20/06/2020"
    },
    {
        pictureProfil: defaultImage,
        pseudo: "Christy",
        picturePost: 'https://i.pinimg.com/originals/22/61/09/2261090ee055b3abe9658228f5a535c7.jpg',
        title: "Limbe",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [{
            pseudoComment: "Evrard",
            text: "comment tu as découvert?",
            timeStamp: "20/06/2020"
        }],
        numberComments: 1,
        likes: 5,
        timeStamp: "20/06/2020"
    },
    {
        pictureProfil: defaultImage,
        pseudo: "Evrard",
        picturePost: 'https://cf.bstatic.com/images/hotel/max1024x768/237/237412687.jpg',
        title: "Kribi",
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [],
        numberComments: 0,
        likes: 0,
        timeStamp: "20/06/2020"
    }
]

const Home = ({setIsSignedIn}) => {
    
    const [state, setState] = useState({ myPost: [] });

    useEffect(() => {
       
        const quotesDB = firebase.database().ref("posts").orderByChild("timestamp");

        quotesDB.on("value", (snapshot) => {
        
          console.log(snapshot.val());
          let previousList = snapshot.val();
          let list = [];
          for (let id in previousList) {
            list.push({ id, ...previousList[id] });
          }
          setState({myPost: list});
        });
 
      }, []);


  return (
    <MyHomePage>
      <MyHeaders setIsSignedIn={setIsSignedIn} />
      <IonContent className="myContent">
            {
                state.myPost.map((item, index) => (
                    <Card item={item} index={index} />
                ))
            }

      </IonContent>
    </MyHomePage>
  );
};

export default Home;
