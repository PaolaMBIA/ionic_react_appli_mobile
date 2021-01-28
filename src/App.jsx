import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  home, search, personCircleOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Search from './pages/Search';
import User from './pages/Users';
import PostDetails from './components/PostDetails';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" component={Login} exact={true}/>
          <Route path="/Home" component={Home} exact={true} />
          <Route path="/Search" component={Search} exact={true} />
          <Route path="/User" component={User} />
          <Route path="/Posts/:postId">
            <PostDetails></PostDetails>
          </Route>
           {/* <Route path="/" render={() => <Redirect to="/Home" />} exact={true} />  */}
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/Home">
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Search" href="/Search">
            <IonIcon icon={search} />
            <IonLabel>Recherche</IonLabel>
          </IonTabButton>
          <IonTabButton tab="User" href="/User">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Mon compte</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
