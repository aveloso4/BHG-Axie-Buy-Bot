import React, { Component } from 'react';
import './App.css';
import Dapp from './Dapp.js'
class App extends Component {

  render() {
    return (
      <div>
        <div className= "row">
          <div className = "col-2"></div>
          <div className = "col-8">
          <Dapp/>

          </div>
          <div className = "col-2"></div>
        </div>
      </div>



       
    
      
    );
  }
}

export default App;
