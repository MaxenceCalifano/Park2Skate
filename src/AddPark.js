import React from 'react';
import { useEasybase } from 'easybase-react';
import { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

let result= []; //will old the result of searchBox
let test="";
export default function AddPark(props) {
  const { Frame, sync } = useEasybase();

  const [parkLatitude, setLatitude] = useState(0);
  const [parkLongitude, setLongitude] = useState(0);
  const [parkType, setParkType] = useState([]);
  const [parkName, setParkName] = useState();

  const handleClick = () => {
    Frame().push({
      lat: parkLatitude,
      lng: parkLongitude,
      Type: parkType,
      Parkname: parkName,
    })
    sync()
  }
  
  const displayResult = () => {
    const name = result.getPlaces()[0].name
    }
    
   const onLoad = (ref) => //call searchbox instance
     {result = ref;
    console.log(result)}

  const onPlacesChanged = () => { test = result.getPlaces()[0].name}//console.log(result.getPlaces()[0].geometry.location);
  
  

  return ( // tout devra être plié et se déplier quand on clique sur le bouton
    <div>
      <input onChange={(event) => setParkName(event.target.value)} type="text" placeholder="name"></input>
      <input type="number" /* placeholder={parkLatitude} */ value={parkLatitude} onChange={(event) => setLatitude(event.target.value)}></input>
      <input type="number" placeholder={parkLongitude} value={parkLongitude} onChange={(event) => setLongitude(event.target.value)}></input>

      <button onClick={() => {
        setLatitude(props.userPosition.lat)
        setLongitude(props.userPosition.lng)
      }} >use my position</button>

      <input type="checkbox" id="street" value="street" onChange={(e) => setParkType([...parkType, e.target.value])} />
      <label htmlFor="street">Street</label>
      <input type="checkbox" value="bowl" onChange={(e) => setParkType([...parkType, e.target.value])} />
      <label htmlFor="bowl">Bowl</label>
      <input type="checkbox" value="Halfpipe" onChange={(e) => setParkType([...parkType, e.target.value])} />
      <label htmlFor="Halfpipe">Halfpipe</label>


      <button onClick={handleClick} >Add a skatepark</button> {/* voir pour modifier aussi*/}

      <StandaloneSearchBox
        onLoad={onLoad}
        onPlacesChanged={
          onPlacesChanged
        }
      >
        <div>
        <div id="result">{test}</div>
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            /* position: "absolute",
            left: "50%",
            marginLeft: "-120px" */
          }}
        /></div>
      </StandaloneSearchBox>
    </div>
  )
}