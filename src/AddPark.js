import React from 'react';
import {useEasybase} from 'easybase-react';

export default function AddPark(props) {
     const {Frame, sync, useFrameEffect} = useEasybase();
     /* useFrameEffect(() => {
        //console.log("Frame data changed!");
      }); */
     const handleClick = () => {
        Frame().push({
           lat:42,
           lng:3,
           Type: "street",
           Parkname:"coucou",
       })
       sync()
   }
  
  
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
        <button onClick= {handleClick} >Add a skatepark</button> {/* voir pour modifier aussi*/}
      </div>
    )
  }