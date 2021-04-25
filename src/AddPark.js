import React from 'react';
import { useEasybase } from 'easybase-react';
import { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

let result = []; //will old the result of searchBox
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

  const onLoad = (ref) => //call searchbox instance
  {
    result = ref;
    console.log(result)
  }

  const onPlacesChanged = () => { 
    const place = result.getPlaces();
    const placeLat = result.getPlaces()[0].geometry.location.lat;
    const placeLng = result.getPlaces()[0].geometry.location.lng;
    setLatitude(placeLat, 
    setLongitude(placeLng))
    props.onMarkerchange({lat: placeLat(), lng:placeLng()})
  }



  return ( // tout devra être plié et se déplier quand on clique sur le bouton
    <div>
      
      <input onChange={(event) => setParkName(event.target.value)} type="text" placeholder="name"></input>
      <input type="number" /* placeholder={parkLatitude} */ value={parkLatitude} onChange={(event) => setLatitude(event.target.value)}></input>
      <input type="number" placeholder={parkLongitude} value={parkLongitude} onChange={(event) => setLongitude(event.target.value)}></input>

      <button onClick={() => { // Use my position button
        setLatitude(props.userPosition.lat)
        setLongitude(props.userPosition.lng)
      }} >use my position</button>

      <input type="checkbox" id="street" value="street" onChange={(e) => setParkType([...parkType, e.target.value])} />
      <label htmlFor="street">Street</label>
      <input type="checkbox" value="park" onChange={(e) => setParkType([...parkType, e.target.value])} />
      <label htmlFor="Park">Park</label>


      <button onClick={handleClick} >Add a skatepark</button> {/* voir pour modifier aussi*/}

      <StandaloneSearchBox
        onLoad={onLoad}
        onPlacesChanged={
          onPlacesChanged
        }
      >
          <input
            type="text"
            placeholder="Search a spot"
            style={{
              boxSizing: `border-box`,
              border: `1px solid`,
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
          />
      </StandaloneSearchBox>
    </div>
  )
}