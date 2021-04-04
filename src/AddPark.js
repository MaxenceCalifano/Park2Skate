import React from 'react';
import {useEasybase} from 'easybase-react';
import { useState } from 'react';

export default function AddPark(props) {
     const {Frame, sync} = useEasybase();
     /* const [park, setPark] = useState({
         latitude: 0,
         longitude:0,
         parkType: "",
         parkName:"",
     }); */
     const [parkLatitude, setLatitude] = useState(0);
     const [parkLongitude, setLongitude] = useState(0);
     const [parkType, setType] = useState();
     const [parkName, setParkName] = useState();
     const handleClick = () => {
        Frame().push({
           lat:parkLatitude,
           lng:parkLongitude,
           Type: "street",
           Parkname: parkName,
       })
       sync()
   }
  
  
    return ( // tout devra être plié et se déplier quand on clique sur le bouton
      <div>
        <input  onChange={ (event) => setParkName(event.target.value)} type="text" placeholder="name"></input>
        <input type="number" placeholder="latitude" onChange={ (event) => setLatitude(event.target.value)}></input>
        <input type="number" placeholder="longitude" onChange={ (event) => setLongitude(event.target.value)}></input>
        <select name="parkType" >
          <option value="">you can select multiple options</option>
          <option value="street">street</option>
          <option value="bowl">bowl</option>
        </select>
        <button onClick= {handleClick} >Add a skatepark</button> {/* voir pour modifier aussi*/}
        <p>{parkLongitude}</p>
        <p>{parkLatitude} </p>
      </div>
    )
  }