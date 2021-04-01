import React, { useState, useEffect } from 'react';
import {EasybaseProvider, useEasybase} from 'easybase-react';

export default function AddPark(frame) {
  /*  const {Frame, configureFrame, sync} = useEasybase();
   useEffect( ()=> {
    configureFrame( { tableName:"PARK2SKATE", limit:10 });
    sync();
  }, []) */
  
  
    return ( // tout devra être plié et se déplier quand on clique sur le bouton
      <div>
        <input type="text" placeholder="name"></input>
        <input type="number" placeholder="latitude"></input>
        <input type="number" placeholder="longitude"></input>
        <select name="parkType" >
          <option value="">you can select multiple options</option>
          <option value="street">street</option>
          <option value="bowl">bowl</option>
        </select>
        <button/*  onClick={ Frame().push({
        }) } */>Add a skatepark</button> {/* voir pour modifier aussi*/}
      </div>
    )
  }