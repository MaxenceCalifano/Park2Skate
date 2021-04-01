import './App.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, InfoBox } from '@react-google-maps/api';
import {EasybaseProvider, useEasybase} from 'easybase-react';
import ebconfig from './ebconfig';

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
          <ParksInfoWindows/>
        </GoogleMap>
        <AddPark/>
      </EasybaseProvider>   
    </div>
  }
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
  return isLoaded ? renderMap() : <></>
}

function ParksInfoWindows() {
  const {Frame,sync, configureFrame} = useEasybase();

  useEffect( ()=> {
    configureFrame( { tableName:"PARK2SKATE", limit:10 });
    sync();
  }, [])
  return (
    <div>
      {Frame().map(ele => 
      <div> {/*Afficher un css en fonction de type : street, bowl etc */}
        <InfoWindow 
      position={{ lat: ele.localisation[0], lng: ele.localisation[1] }}>
        <h3>{ele.parkname}</h3>
      </InfoWindow>
      </div>
      
    )}
    </div>
    
  )
  
}
function AddPark() {
  return (
    <div>
      <input type="text" placeholder="name"></input>
      <input type="number" placeholder="latitude"></input>
      <input type="number" placeholder="longitude"></input>
      <select name="parkType" multiple="true">
        <option value="">you can select multiple options</option>
        <option value="street">street</option>
        <option value="bowl">bowl</option>
      </select>
      <button>Add a skatepark</button> {/* voir pour modifier aussi*/}
    </div>
  )
}
export default App;