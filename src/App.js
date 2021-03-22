import './App.css';
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '700px',
  height: '600px',
};

const center = {
  lat: -3.745,
  lng: -38.523
};


function App() {

  return (
    <div className="App">
      <AppMap />
      
    </div>
  );
}
function AppMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDd7cD_9w-b8FgSV-nTidfv3y2u62RIXHg"
  })

  const [map, setMap] = React.useState(null)

 /*  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []) */

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        /* onLoad={onLoad}
        onUnmount={onUnmount} */
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}
export default App;
