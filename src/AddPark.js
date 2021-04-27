import React from 'react';
import { useEasybase } from 'easybase-react';
import { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import StreetOrPark from './StreetOrPark';
import EditParkName from './EditParkName'


let result = []; //will old the result of searchBox

export default function AddPark(props) {
  const { Frame, sync } = useEasybase();

  const [parkLatitude, setLatitude] = useState(0);
  const [parkLongitude, setLongitude] = useState(0);
  const [parkType, setParkType] = useState([]);
  const [parkName, setParkName] = useState();
  //const [parkTypeDisplay, displayParkType] = useState(false)
  const [actualStepOfAddPark, changeStep] = useState(1);

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
    props.onMarkerchange({ lat: placeLat(), lng: placeLng() })
  }

  return (
    <div>
      {actualStepOfAddPark === 1 ? <button onClick={() => changeStep(actualStepOfAddPark+1)/* displayParkType(a => !a) */} >Ajouter un spot</button> : null}
      
      <StreetOrPark hidden={actualStepOfAddPark} parkType={parkType} setParkType={setParkType} changeStep={changeStep}/>
      <EditParkName step={actualStepOfAddPark} setParkName={setParkName} changeStep={changeStep}/>

      <input type="number" /* placeholder={parkLatitude} */ value={parkLatitude} onChange={(event) => setLatitude(event.target.value)}></input>
      <input type="number" placeholder={parkLongitude} value={parkLongitude} onChange={(event) => setLongitude(event.target.value)}></input>


    
      <button onClick={() => { // Use my position button
        setLatitude(props.userPosition.lat)
        setLongitude(props.userPosition.lng)
      }} >use my position</button>

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
      <button onClick={handleClick} >Add a skatepark</button> {/* voir pour modifier aussi*/}
    </div>
  )
}