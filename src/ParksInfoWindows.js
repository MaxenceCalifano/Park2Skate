import React, { useState, useEffect } from 'react';
import {EasybaseProvider, useEasybase} from 'easybase-react';
import {InfoWindow } from '@react-google-maps/api';

export default function ParksInfoWindows() {
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