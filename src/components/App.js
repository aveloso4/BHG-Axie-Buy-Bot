import React, { Component } from 'react';
import './App.css';
import Dapp from './Dapp.js'
import Web3 from 'web3';
class App extends Component {



  async componentWillMount(){

  }
  
  render() {
    return (
      <div>
       <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" style={{  backgroundImage: `url(./logo.png)`, height : '8%', backgroundRepeat : 'no-repeat', backgroundSize : '6%', backgroundPositionX : '8%', backgroundPositionY:'1%'}}><br/><br/><br/>
        
            <h2
              className="navbar-brand col-sm-3 col-md-2 mr-0" style={{fontSize : '300%'}}
            >
              Axie Buy Bot
            </h2>
        </nav>
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
