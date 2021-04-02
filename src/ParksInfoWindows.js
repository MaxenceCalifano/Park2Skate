import React, { useEffect } from 'react';
import {useEasybase} from 'easybase-react';
import {InfoWindow } from '@react-google-maps/api';

export default function ParksInfoWindows() {
     const {Frame,sync, configureFrame, useFrameEffect} = useEasybase();
  
     useEffect( ()=> {
      configureFrame( { tableName:"PARK2SKATE", limit:10 });
      sync();
      //console.log(Frame())
    }, []) 

   /*  useFrameEffect(() => {
      //console.log("Frame data changed!");
    }); */

    return (
       <div>
         {Frame().map( (ele,i) =>
        
          <InfoWindow 
        position={{ lat: ele.lat, lng: ele.lng }} key={i}>
          <div><h3>{ele.parkname} </h3>
          </div>
        </InfoWindow>
      )}  
      </div>
    )
    
  }