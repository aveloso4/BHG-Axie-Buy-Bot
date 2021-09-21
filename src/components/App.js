import React, { Component } from 'react';
import './App.css';
import Dapp from './Dapp.js'
import Web3 from 'web3';
class App extends Component {



  async componentWillMount(){
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. Your should consider trying MetaMask!')
    }
  }
  
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
