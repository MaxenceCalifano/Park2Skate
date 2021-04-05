import React from 'react';
import {useEasybase} from 'easybase-react';
import { useState } from 'react';

export default function AddPark(props) {
     const {Frame, sync} = useEasybase();
     
     const [parkLatitude, setLatitude] = useState(0);
     const [parkLongitude, setLongitude] = useState(0);
     const [parkType, setParkType] = useState([]);
     const [parkName, setParkName] = useState();
     
     const handleClick = () => {
        Frame().push({
           lat:parkLatitude,
           lng:parkLongitude,
           Type: parkType,
           Parkname: parkName,
       })
       sync()
   }
    return ( // tout devra être plié et se déplier quand on clique sur le bouton
      <div>
        <input  onChange={ (event) => setParkName(event.target.value)} type="text" placeholder="name"></input>
        <input type="number" /* placeholder={parkLatitude} */ value={parkLatitude} onChange={ (event) => setLatitude(event.target.value)}></input>
        <input type="number" placeholder={parkLongitude} value={parkLongitude} onChange={ (event) => setLongitude(event.target.value)}></input>
        
        <button onClick={() => { 
            setLatitude(props.userPosition.lat)
            setLongitude(props.userPosition.lng)} } >use my position</button>

        <input type="checkbox" id= "street" value="street" onChange={(e) => setParkType([...parkType,e.target.value])}/>
        <label for="street">Street</label>
        <input type="checkbox" value="bowl" onChange={(e) => setParkType([...parkType,e.target.value])}/>
        <label for="bowl">Bowl</label>

        <button onClick= {handleClick} >Add a skatepark</button> {/* voir pour modifier aussi*/}
      </div>
    )
  }