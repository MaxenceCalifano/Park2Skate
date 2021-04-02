import './App.css';
//import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import ebconfig from './ebconfig.js';
//import AddPark from "./AddPark";
//import ParksInfoWindows from './ParksInfoWindows';
import Container from './container';

//import ParksInfoWindows from "./ParksInfoWindows"

function App() {

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_AUTH_TOKEN
  })



  //  return 
 // } //fin de rendereMap
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
  return isLoaded ? <div>
  <EasybaseProvider ebconfig={ebconfig}>
  
    <Container/>
  </EasybaseProvider>
</div> : <></>
}  //fin de app


export default App;