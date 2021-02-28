import React from 'react'
import Navbar from './Components/Navbar'
import Routes from './Components/Routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Styles/App.css'

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes/>
    </React.Fragment>
  );
}

export default App;
