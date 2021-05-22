import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonContent, IonInput, IonItem, IonList, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import ParentView from './components/ParentView/ParentView';
import ManageGarments from './components/ParentView/manageGarments/ManageGarments';
import Login from './components/Login'
import CreateGarment from './components/ParentView/CreateGarment/CreateGarment'
import UserView from './components/UserView/UserView';
import Header from './components/shared/Header';
import { anyCurrentUser, signIn, signOut } from './scripts/firebase';
import { isTemplateExpression } from 'typescript';
import TestApi from './components/TestApi';

const App = () => {
  // const [loggedInChecked, setLoggedInChecked] = useState(false);
  // const [isSignedIn, setIsSignedIn] = useState(false);

  // const handleSignIn = async () => {
  //   const isAuthenticated = await anyCurrentUser();
  //   if (isAuthenticated) {
  //     setIsSignedIn(true);
  //   }
  //   setLoggedInChecked(true);
  // }

  // if (!loggedInChecked) {
  //   handleSignIn();
  // }

  const [authenticated, setAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    checkAuthentication();
  }, [])

  // Check if any user is already authenticated
  const checkAuthentication = async (): Promise<void> => {
    const isAuthenticated: any = await anyCurrentUser();
    setAuthenticated(isAuthenticated);
  }

  // Handles the authentication, sign in and sign out
  const handleAuthentication = async (): Promise<void> => {
    if (!authenticated) {
      const signedIn = signIn();
      setAuthenticated(signedIn);
    }
    if (authenticated) {
      const signedOut = signOut();
      setAuthenticated(signedOut);
    }
  }
  return (
    <>
      {/* {loggedInChecked ? */}
      {/* {authenticated ? */}
        <IonApp>
          <IonContent style={{ maxHeight: 61 }}>
            <Header />
          </IonContent>
          <IonContent scrollY>
            {authenticated ?
            // {isSignedIn ?
              <IonReactRouter>
                <IonRouterOutlet>
                  <Route path="/ParentView" component={ParentView} />
                  <Route path="/ManageGarments" render={(props) => <ManageGarments props={props} />} />
                  <Route path="/CreateGarment" render={(props) => <CreateGarment props={props} />} />
                  <Route path="/UserView" component={UserView} />
                  <Route path="/Login" component={Login} />
                  <Route path="/TestApi" component={TestApi} />
                  <Route exact path="/" render={() => <Redirect to="/ParentView" />} />
                </IonRouterOutlet>
              </IonReactRouter>
              :
              <IonButton onClick={()=>handleAuthentication()}>
                Login
              </IonButton>
              // <Login handleSignIn={handleSignIn} />
            }
          </IonContent>
        </IonApp>
        {/* :
        <></>
      } */}
    </>

  );
}

export default App;
