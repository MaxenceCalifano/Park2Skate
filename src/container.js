import React, { useState } from 'react';
//import {useEasybase} from 'easybase-react';
//import {InfoWindow } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api'
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
            <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
    >
   <ParksInfoWindows userPosition={center}/>
    </GoogleMap>
    <AddPark userPosition={center} />
        </div>
    )
}