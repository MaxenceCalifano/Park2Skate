import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import ebconfig from './ebconfig';
import AddPark from "./AddPark";
import ParksInfoWindows from "./ParksInfoWindows"

const containerStyle = {
  width: '100%',
  height: '400px',
};

function App() {

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_AUTH_TOKEN
  })

  const [center, setCenter] = useState({
    lat: 35,
    lng: -105
  });

  function getLocation() {
    function success(position) {
      setCenter({
        ...center,
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }
    function error() {
      console.log('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  const renderMap = () => {
    function onLoad(mapInstance) {
      // do something with map Instance
      getLocation()
      console.log("test .env ici " + process.env.REACT_APP_test)
    }

    return <div>
      <EasybaseProvider ebconfig={ebconfig}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          onLoad={onLoad}
        >
        <ParksInfoWindows />
        </GoogleMap>
        <AddPark />
      </EasybaseProvider>
    </div>
  }
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
  return isLoaded ? renderMap() : <></>
}


export default App;