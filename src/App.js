import './App.css';
import { useJsApiLoader } from '@react-google-maps/api';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig.js';
import Container from './container';


function App() {
  const libraries = ["places"];
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_AUTH_TOKEN,
    libraries: [...libraries],
  })
  //  return 
  // } //fin de rendereMap
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
  return isLoaded ? <div>
    <EasybaseProvider ebconfig={ebconfig}>

      <Container />
    </EasybaseProvider>
  </div> : <></>
}  //fin de app


export default App;