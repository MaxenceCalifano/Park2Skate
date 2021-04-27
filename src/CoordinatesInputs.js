import { useSpring, animated as a } from 'react-spring'

export default function CoordinatesInputs(props) {
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
    const contentProps = useSpring({
        opacity: props.step === 4 ? 1 : 0,
        marginLeft: props.step === 4 ? 0 : -500
    });
    return (
        props.step === 4 ?
            <a.div style={contentProps}  >
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
      </a.div> : null
    )
}