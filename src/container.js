import React, { useState } from 'react';
//import {useEasybase} from 'easybase-react';
//import {InfoWindow } from '@react-google-maps/api';
import { Marker, GoogleMap } from '@react-google-maps/api'
import AddPark from './AddPark'
import ParksInfoWindows from './ParksInfoWindows';

export default function Container() {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const [center, setCenter] = useState({
    lat: 35,
    lng: -105
  });
  const [markerPosition, setMarkerPosition] = useState(center);
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

  function onLoad(mapInstance) {
    // do something with map Instance
    getLocation()
  }
  return (
    <div>
      <button onClick={getLocation}>Around me</button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onLoad}
      >
        <ParksInfoWindows userPosition={center} />
        <Marker position={markerPosition} animation={1} />
      </GoogleMap>
      <AddPark onMarkerchange={setMarkerPosition} userPosition={center} />
    </div>
  )
}