import React, { useState, useEffect } from 'react';

import { IonContent, IonInput, IonIcon, IonGrid, IonRow, IonCol,  IonCard, IonImg, IonText, IonSearchbar } from '@ionic/react';
import MyHeaders from '../components/Headers';

import imageTest from '../assets/nkolandom.PNG';
import kola from '../assets/kola.PNG';
import defaultImagePost from '../assets/defaultImagePost.png';

import { search } from 'ionicons/icons';

import firebase from "../firebaseConfig";

import { MySearchPage } from '../styledComponents/StyleSearch';
import { useHistory } from 'react-router';


const result = [
    {
        title: "Limbe",
        picturePost: "https://i.pinimg.com/originals/22/61/09/2261090ee055b3abe9658228f5a535c7.jpg"
    },
    {
        title: "Centre touristique de Nkolandom",
        picturePost: imageTest
    },
    {
        title: "Kribi",
        picturePost: "https://cf.bstatic.com/images/hotel/max1024x768/237/237412687.jpg"
    },
    {
        title: "Les gorges de Kola",
        picturePost: kola
    }
]

const Search = () => {
    const [mySearch, setMySearch] = useState("");
    const [state, setState] = useState({ mySearchPost: [] });
    const [allPosts, setAllPosts] = useState({ myAllPosts: [] });

    const history = useHistory();
  
    //le useEffect permet ici d'avoir un premier affichage de la requête faite dans la base de données
    useEffect(() => {
        const quotesDB = firebase.database().ref("posts");

        quotesDB.on("value", (snapshot) => {
          console.log(snapshot.val());
          let previousList = snapshot.val();
          let list = [];
          for (let id in previousList) {
            list.push({ id, ...previousList[id] });
            };

          setAllPosts({ myAllPosts: list });
          setState({mySearchPost: list});
        });

    }, []);
  
    const detailPostHandler = (postId)=> {
        //console.log(postId,'u')
        history.push(`Posts/${postId}`)
    }

    function mySearchHandler(e) {
       
        const mySearchItem = e.detail.value.trim();
        setMySearch(mySearchItem);

        if (mySearchItem) {
            const filteredEnter = allPosts.myAllPosts.filter((element) => {
                return element.title.toLowerCase().indexOf(mySearchItem.toLowerCase()) >= 0
            });   
            console.log(filteredEnter)
            setState({ mySearchPost: filteredEnter })
            
        } else {

            setState({mySearchPost: allPosts.myAllPosts})
        }

    }

  return (
    <MySearchPage>
          <MyHeaders />
          <IonContent className="myContent">
              <IonGrid className="myInputGrid">
                  <IonRow className="myInputRow">
                      <IonCol size="10">
                          <IonSearchbar
                              value={mySearch}
                              onIonChange={mySearchHandler}
                              placeholder="je recherche..."
                              color="light"
                          >             
                          </IonSearchbar>
                         
                      </IonCol>
                  </IonRow>
              </IonGrid>
              {
                state.mySearchPost.map((item, index) => (
                    <IonGrid className="myResultGrid" key={index}>
                        <IonRow>
                            <IonCol >
                                <IonText className="myResultTitle">{ item.title }</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol sizeMd="12">
                                <IonCard className="myResultPicture">
                                    <IonImg src={item.picturePost} alt="" onClick={() => detailPostHandler(item.id)} />
                                    
                                    {/* {
                                        item.picturePost ?
                                            <IonImg src={item.picturePost} alt="" onClick={(item)=> detailPostHandler(item.id)}/>
                                            : <IonImg src={defaultImagePost} alt="" />
                                    } */}
                                    
                                </IonCard>
                            </IonCol>
                        </IonRow>
                </IonGrid>         
                ))
              }
      </IonContent>
    </MySearchPage>
  );
};

export default Search;
