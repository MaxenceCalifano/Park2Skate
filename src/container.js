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
    /* const {Frame,sync, configureFrame, useFrameEffect} = useEasybase();
  
     useEffect( ()=> {
      configureFrame( { tableName:"PARK2SKATE", limit:10 });
      sync();
    }, []) 
 */
   
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
          console.log("test .env ici " + process.env.REACT_APP_test)
        }
    return (
        <div>
            <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
    >
    {/* {Frame().map(ele => 
       <InfoWindow 
       position={{ lat: ele.localisation[0], lng: ele.localisation[1] }}>
         <h3>{ele.parkname}</h3>
       </InfoWindow>
       
     
   )} */}
   <ParksInfoWindows/>
    </GoogleMap>
    <AddPark passer la fonction qui a frame en props 
    et tout virer dans addpark pour faire remonter ici />
        </div>
        
    )
}