import React, { useState } from 'react';
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
import ManageGarments from './components/ParentView/ManageGarments';
import Login from './components/Login'
import CreateGarment from './components/ParentView/CreateGarment/CreateGarment'
import UserView from './components/UserView/UserView';
import Header from './components/shared/Header';
import { anyCurrentUser } from './scripts/firebase';
import { isTemplateExpression } from 'typescript';
import TestApi from './components/TestApi';

const App = () => {
  const [loggedInChecked, setLoggedInChecked] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  //TODO: score: -1 | setCount: 0 (inner layer: false) | name: överdrag
  //TODO: score: -2 | setCount: 0 (inner layer: false) | name: jacket and överdrag
  //
  //TODO: score: 2 | setCount: 2 (inner layer: true) | name: regn overall
  //TODO: score: 2 | setCount: 2 (inner layer: true) | name: regn jacket  and regn överdrag
  //TODO: setcount måste bli 3 

  //TODO: Hitta en brytpunkt i poäng för att filtrera fram de enda relevanta kläderna



  // const conditions = []



  // const cond1 = {
  //   temperature: -3,
  //   condition: 'clear',
  // }

  // conditions.push(cond1)
  // //TODO: Testa denna
  // const cond2 = {
  //   temperature: -5,
  //   condition: 'snow',
  // }
  // conditions.push(cond2)
  // const cond3 = {
  //   temperature: 0,
  //   condition: 'snow',
  // }
  // conditions.push(cond3)
  // const cond4 = {
  //   temperature: 1,
  //   condition: 'snow',
  // }
  // conditions.push(cond4)
  // const cond5 = {
  //   temperature: -3,
  //   condition: 'snow',
  // }
  // conditions.push(cond5)
  // const cond6 = {
  //   temperature: 1,
  //   condition: 'rain',
  // }
  // conditions.push(cond6)
  // const cond7 = {
  //   temperature: 4,
  //   condition: 'rain',
  // }
  // conditions.push(cond7)
  // const cond8 = {
  //   temperature: 9,
  //   condition: 'rain',
  // }
  // conditions.push(cond8)
  // const cond9 = {
  //   temperature: 17,
  //   condition: 'rain',
  // }
  // conditions.push(cond9)
  // const condition0 = {
  //   temperature: -2,
  //   condition: 'clear',
  // }
  // conditions.push(condition0)
  // const condition1 = {
  //   temperature: 5,
  //   condition: 'clear',
  // }
  // conditions.push(condition1)
  // const condition2 = {
  //   temperature: 16,
  //   condition: 'clear',
  // }
  // conditions.push(condition2)


  // conditions.map(condition => {
  //   const garments = []
  //   const middleLayers = []
  //   const suggestedClothes = []

  //   const addGarment = (name, type, tempMax, tempMin, condition) => {
  //     const garment = {
  //       name: name,
  //       type: type,
  //       temperatureMax: tempMax,
  //       temperatureMin: tempMin,
  //       condition: condition,
  //     }
  //     garments.push(garment);
  //     return garment;
  //   }

  //   addGarment('fodrad rengjacka', 'jacket',
  //     5,
  //     0,
  //     ['rain', 'wet']) // - snow, clear, cloud, wind

  //   addGarment('regnjacka ', 'jacket',
  //    25,
  //     8, 
  //     ['rain', 'wet']) // - snow, clear, cloud, wind

  //   addGarment('fodrad overall', 'overall', 
  //   5, 
  //   0,
  //    ['clear', 'snow', 'cloud', 'wind']) // - wet, rain

  //   addGarment('fodrad jacka ', 'jacket',
  //    5, 
  //    0,
  //     ['clear', 'snow', 'cloud', 'wind']) // - wet, rain
  //   addGarment('jacka', 'jacket', 
  //   15,
  //    5, 
  //    ['clear', 'cloud', 'wind']) // - wet, rain, snow

  //   addGarment('fodrad överdrag ', 'shell', 
  //   5, 
  //   0, 
  //   ['clear', 'snow', 'cloud', 'wind']) // - wet, rain
  //   addGarment('överdrag', 'shell',
  //    15, 
  //    5,
  //     ['clear', 'cloud', 'wind']) // - wet, rain, snow
  //   addGarment('regn överdrag ', 'shell',
  //    20, 
  //    8,
  //     ['rain', 'wet']) // - snow, clear, cloud, wind
  //   addGarment('fodrad regn överdrag', 'shell',
  //    5,
  //     0,
  //      ['rain', 'wet']) // - snow, clear, cloud, wind

  //   addGarment('vit mössa', 'hat', 
  //   5, 
  //   -100,
  //    ['snow', 'clear', 'cloud', 'wet', 'wind']) // - rain
  //   addGarment('randig mössa ', 'hat', 
  //   15, 
  //   5, ['snow', 'clear', 'cloud', 'wet', 'wind']) // -rain
  //   addGarment('keps', 'hat', 100, 15, ['clear', 'wet', 'wind']) // - rain, snow, cloud
  //   //TODO: behöver också finnas som extra plagg, kontrolleras  if(!type.hat){ arr.push(rainHat) }
  //   addGarment('regn hatt', 'hat', 100, -100, ['rain', 'wet']) // - rain, snow, cloud

  //   addGarment('halskrage', 'scarf', 5, -100, ['snow', 'clear', 'cloud', 'wet', 'rain', 'wind'])

  //   addGarment('vinter handskar ', 'gloves', 5, -10, ['snow', 'clear', 'cloud', 'wind']) // -rain, wet
  //   addGarment('fodrade regn handskar ', 'gloves', 7, 0, ['wet', 'rain']) // - snow, clear, cloud, wind
  //   addGarment('regn handskar ', 'gloves', 15, 7, ['wet', 'rain']) // - snow, clear, cloud, wind
  //   addGarment('vantar tyg', 'gloves', 15, 7, ['clear', 'cloud', 'wind']) // -snow, rain, wet
  //   addGarment('vantar finger tyg', 'gloves', 15, 7, ['clear', 'cloud', 'wind']) // -snow, rain, wet

  //   //TODO: wet > snow
  //   addGarment('fodrade regn stövlar', 'shoes', 10, -2, ['rain', 'wet']) // -snow, cloud, clear, wind
  //   addGarment('regn stövlar', 'shoes', 100, 8, ['rain', 'wet']) // -snow, cloud, clear, wind
  //   addGarment('vinter kängor', 'shoes', 5, -100, ['snow', 'clear', 'cloud', 'wind']) // - rain, wet
  //   addGarment('fodrade skor', 'shoes', 10, 5, ['clear', 'cloud', 'wind']) // -snow, rain, wet
  //   addGarment('sneakers', 'shoes', 20, 10, ['clear', 'cloud', 'wind']) // -snow, rain, wet
  //   addGarment('sandaler', 'shoes', 100, 20, ['clear', 'cloud', 'wind']) // -snow, rain, wet




  //   // TODO: kontrollera hur detta ska göras
  //   // TODO: sockor
  //   // TODO: regnhatt
  //   // TODO: score: 2.1 | setCount: 2 (inner layer: true) | name: mössa randig (if(type = 'jacket' || type == 'shell' ......))

  //   // score: 2.1 | setCount: 1 | name: regn handskar  
  //   // score: 2.0500000000000003 | setCount: 2 | name: fodrade regn stövlar++++++ mellan lager
  //   // score: 2.0500000000000003 | setCount: 2 | name: fodrade regn handskar ++++++ mellan lager
  //   // score: 2.0500000000000003 | setCount: 2 | name: halskrage++++++ mellan lager
  //   // score: 1.9 | setCount: 2 | name: regnjacka  and fodrad regn överdrag++++++ mellan lager
  //   // score: 1.9 | setCount: 2 | name: regnjacka  and regn överdrag ++++++ mellan lager
  //   // score: 1.9 | setCount: 2 | name: fodrad rengjacka and fodrad regn överdrag++++++ mellan lager

  //   const woolShirt = {
  //     name: 'ull tröja',
  //     forType: ['jacket', 'overall'],
  //     grade: 'veryWarm',
  //     temperatureCompensation: 5,
  //   }
  //   const woolPants = {
  //     name: 'ull byxa',
  //     forType: ['shell', 'overall'],
  //     grade: 'veryWarm',
  //     temperatureCompensation: 5,
  //   }
  //   const socks = {
  //     name: 'sockor',
  //     forType: ['shoes'],
  //     grade: 'veryWarm',
  //     temperatureCompensation: 5,
  //   }
  //   const fleeceShirt = {
  //     name: 'fleece tröja',
  //     forType: ['jacket', 'overall'],
  //     grade: 'warm',
  //     temperatureCompensation: 2.5,
  //   }
  //   const fleecePants = {
  //     name: 'fleece byxa',
  //     forType: ['shell', 'overall'],
  //     grade: 'warm',
  //     temperatureCompensation: 2.5,
  //   }

  //   middleLayers.push(fleecePants);
  //   middleLayers.push(fleeceShirt);
  //   middleLayers.push(woolPants);
  //   middleLayers.push(woolShirt);
  //   middleLayers.push(socks);


  //   /**
  //    * Poängsystem:
  //    * garment får 1p för temperatur och 1p för väderförhållande
  //    * får t.ex om en overall klarar av regn(1p) och 5grader temp(1p) får den 2p och hamnar i den högsta skalan av poäng
  //    * får t.ex en regnjacka som klarar temperaturen får den 1p vilket kan komma att kombineras med regnbyxor som också kan få 1p vilket ger 2p och hamnar i högsta skalan av poäng
  //    * en overall som klarar regn(1p) men inte temperatur får 1p men kan kompletteras med ett innerlager och om temperaturen möter kriteriet då så ökar det med 1p och hamnar i högsta skalan
  //    * 
  //    * set av garment poängsätts även för antal plagg, en overall = 1, jacka + överdrag = 2, jacka + överdrag + innerlager = 3
  //    * //TODO: måste fixa 3p system
  //    * ju lägre poäng desto bättre
  //    * 
  //    * ex:
  //    * väder: 5grader och regn
  //    * overall (regn) (5grader) = 2p
  //    * 
  //    * fodrad jacka (regn) (5grader) = 1p 
  //    * fodrade överdragsbyxor (regn) (5grader) = 1p  
  //    * kombineras till 2p 
  //    * 
  //    * overall (regn) (10grader) = 1p (möter inte temperaturkriteriet)
  //    */

  //   // Går igenom listan och filtrerar fram alla kläder som på något sätt matchar vädret
  //   console.log(condition.temperature + '°C - ' + condition.condition);
  //   garments.map((garment) => {
  //     const set = []; // Räknar hur många klädesplagg som ingår(ytterlager och innerlager) för att möta kriterierna
  //     let score = 0;  // Poäng för att sortera bästa matchen
  //     let allCriteriaMet = false // Om false -> ytterkläderna räcker inte för temperaturen, -> testar lägga till mellan lager
  //     let middleLayerTemperatureModifier = 0; // Skillnaden ett mellanlager gör för temperaturen (räknar alltid neråt eftersom mellanlager ökar temperaturen i kläderna)// TODO: deficiancy? 
  //     let hasInnerLayer = false; // Om ett mellanlager har lagts till i set[]
  //     let innerLayerGarment = null;

  //     garment.score = 0;

  //     const meetsConditionAndTemp =
  //       (garment.condition.includes(condition.condition)) &&
  //       (garment.temperatureMax > condition.temperature) &&
  //       (garment.temperatureMin < condition.temperature);

  //     const meetsCondition = garment.condition.includes(condition.condition);

  //     //TODO: filtrera bort de som ger false pga för hög temp, en vinteroverall ska ska inte fungera vid 10c varmt med ull under?
  //     const meetsTemperature =
  //       (garment.temperatureMax > condition.temperature) &&
  //       (garment.temperatureMin < condition.temperature);

  //     if (meetsConditionAndTemp) {  // Kollar om garment möter både förhållandet(regn) och temperaturen
  //       garment.score = 3; // förhållande 1p + teimp 1p (+0.1p för att förhållande > temperatur) 
  //       allCriteriaMet = true;
  //       //TODO: testa om && garment.temperatureMax < condition.temperature
  //     } else if (meetsCondition && (garment.temperatureMax > condition.temperature)) { // Kollar om garment möter förhållande kriteriet (regn)
  //       garment.score = 2; // 1.1p för förhållande (+0.1p för att förhållande > temperatur) 
  //     } else if (meetsTemperature) { // kollar om garment möter temperatur kriterie
  //       garment.score = 1; // 1p för temperatur
  //     }


  //     //TODO: ska den här läggas in under kontroll för förhållande?
  //     // om inte både temperatur och förhållande möts så testas temperaturen om den subtraheras med innre lagrets temperaturvärde
  //     if (!allCriteriaMet &&
  //       meetsCondition &&
  //       garment.temperatureMax > condition.temperature &&
  //       (garment.type === 'jacket' ||
  //         garment.type === 'shell' ||
  //         garment.type === 'overall' ||
  //         garment.type === 'shoes'
  //       )) {

  //       middleLayers.map((middleLayer) => {
  //         if ( // if the middle layer is matching the over layer type
  //           middleLayer.grade === 'warm' &&
  //           middleLayer.forType.includes(garment.type) &&
  //           (garment.temperatureMin - middleLayer.temperatureCompensation) < condition.temperature) {

  //           garment.score += 0.5; // 0.9 for meeting temperatuer criteria but not 1 since it requiers a middle layer
  //           garment.innerLayer = middleLayer;
  //           hasInnerLayer = true; // sätter att klädesplagget behöver innerlager, används för att poängsätta plagget/kombinationen

  //         }

  //         if (
  //           !hasInnerLayer &&
  //           middleLayer.grade === 'veryWarm' &&
  //           middleLayer.forType.includes(garment.type) &&
  //           (garment.temperatureMin - middleLayer.temperatureCompensation) < condition.temperature) {

  //           garment.score += 0.5; // 0.9 for meeting temperatuer criteria but not 1 since it requiers a middle layer
  //           garment.innerLayer = middleLayer;
  //           hasInnerLayer = true; // sätter att klädesplagget behöver innerlager, används för att poängsätta plagget/kombinationen
  //         }
  //       })
  //     }

  //     // reduce jackets and shellpants points to lower them in the order to give precidence to overalls
  //     if (garment.type === 'jacket' || garment.type === 'shell') {
  //       garment.score -= 0.25;
  //     }
  //   })


  //   garments.sort((a, b) => a.score - b.score || b.setCount - a.setCount);
  //   garments.reverse();

  //   garments.map((garment) => {
  //     const exists = suggestedClothes.some((existingGarment) => existingGarment.type === garment.type);
  //     //TODO: testa om score > 1 fungerar korrekt
  //     if (!exists && garment.score > 1) {
  //       suggestedClothes.push(garment);
  //     }
  //     // if (garment.score > 1) {
  //     // console.log('score: ' + garment.score + ' | name: ' + garment.name + (garment.innerLayer ? ' med ' + garment.innerLayer.name : ' '));
  //     // }
  //   })


  //   // Check if overall exists
  //   //TODO: rename
  //   const overallExists = suggestedClothes.find((garment) => {
  //     return garment.type === 'overall';
  //   })

  //   // splice jacket and shell pants if overall exists and if its better scored than jacket or shell pants
  //   // If the overall is lower scored than either the jacket or shellpants the overall will be spliced
  //   // TODO: evaluate if a check if either jacket or shell exists before splicing overall
  //   for (let i = suggestedClothes.length - 1; i >= 0; i--) {
  //     const garment = suggestedClothes[i];

  //     if (overallExists &&
  //       overallExists.score > garment.score &&
  //       (garment.type === 'jacket' || garment.type === 'shell')) {
  //       suggestedClothes.splice(i, 1);
  //     } else if (overallExists &&
  //       overallExists.score < garment.score &&
  //       (garment.type === 'jacket' || garment.type === 'shell')) {
  //       suggestedClothes.splice(suggestedClothes.indexOf(overallExists), 1);
  //       break;
  //     }
  //   }

  //   console.log('---------------------------------------------------------------------------------');
  //   suggestedClothes.map((a) => {
  //     console.log('score: ' + a.score + ' name: ' + a.name + (a.innerLayer ? ' med ' + a.innerLayer.name : ' '));
  //   })


  //   console.log('-------------------------------------------------------------------------------');

  // })

  // //TODO: Is this even needed?
  const handleSignIn = async () => {
    // if(localStorage.getItem('isAuthenticated')){
    //   setIsSignedIn(true);
    // }
    const isAuthenticated = await anyCurrentUser();
    if (isAuthenticated) {
      setIsSignedIn(true);
    }
    setLoggedInChecked(true);
  }

  if (!loggedInChecked) {
    handleSignIn();
  }

  return (
    <>
      {loggedInChecked ?
        <IonApp>
          <IonContent style={{ maxHeight: 61 }}>
            <Header />
          </IonContent>
          <IonContent scrollY>
            {
              isSignedIn === true ?
                <IonReactRouter>
                  <IonRouterOutlet>
                    <Route path="/ParentView" component={ParentView} />
                    <Route path="/ManageGarments" render={(props) => <ManageGarments props={props} />} />
                    <Route path="/CreateGarment" render={(props) => <CreateGarment props={props} />} />
                    <Route path="/UserView" component={UserView} />
                    <Route path="/TestApi" component={TestApi} />
                    <Route path="/Login" component={Login} />
                    <Route exact path="/" render={() => <Redirect to="/ParentView" />} />
                  </IonRouterOutlet>
                </IonReactRouter>
                :
                // <IonButton onClick={() => handleSignIn(true)}>{isSignedIn}</IonButton>
                <Login handleSignIn={handleSignIn} />
            }
          </IonContent>
        </IonApp>
        :
        <></>
      }
    </>

  );
}

export default App;
