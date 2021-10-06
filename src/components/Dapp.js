import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { Button , FormControl, InputGroup} from 'react-bootstrap';
import { GraphQLClient } from 'graphql-request'
import { ethers } from 'ethers';
import { MdInput } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { GiAlienBug ,GiHealthPotion, GiSpeedometer,GiSwitchWeapon} from "react-icons/gi";
import { FaBabyCarriage, FaRegAddressCard } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { BiUpArrowAlt } from "react-icons/bi";
import {abi, marketAddress , wethAddress, walletAddress, walletPrivateKey, rpcURL, graphqlURL, graphqlquery} from './config'

const roninweb3           = new Web3(new Web3.providers.HttpProvider(rpcURL));
const marketContract      = roninweb3.eth.Contract(abi, marketAddress)
marketAddress       = roninweb3.utils.toChecksumAddress('0x213073989821f738a7ba3520c3d31a1f9ad31bbd')
wethAddress         = roninweb3.utils.toChecksumAddress('0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5')
walletAddress       = roninweb3.utils.toChecksumAddress('0x76bd076f18b926407ce1473bba4c77c047b10fc8')



class DApp extends Component {
  constructor(props){
    super(props)
    this.state={
      tokenID : '',
      data : [],
      ownerAddress : '',
      price : 0,
      listIndex : 0,
      listState  : 0,
      datatable : [],
      health : '',
      skill : '',
      speed : '',
      morale : '',
      breedCount : '',
      classname : '',
      enablebutton : false,
      message : ''
    }
  }

  async componentWillMount(){
  }

  async getValue(){
    var variables = {
      "axieId": this.state.tokenID
    }
    const client = new GraphQLClient(graphqlURL, { headers: {} })
    client.request(graphqlquery, variables).then((data) => this.setState({
      data : data
    }))
    console.log(this.state.data)
  }
  async information(){
    await this.getValue()
    let ownerAddress
    let price
    let listIndex
    let listState
    let health
    let speed
    let skill
    let morale
    let breedCount
    let classname

    try{
      ownerAddress = roninweb3.utils.toChecksumAddress(this.state.data['axie']['owner'])
      price = ethers.BigNumber.from(this.state.data['axie']['auction']['suggestedPrice'])
      listIndex = ethers.BigNumber.from(this.state.data['axie']['auction']['listingIndex'])
      listState = ethers.BigNumber.from(this.state.data['axie']['auction']['state'])
      health =this.state.data['axie']['stats']['hp']
      speed  = this.state.data['axie']['stats']['morale']
      skill  = this.state.data['axie']['stats']['skill']
      morale = this.state.data['axie']['stats']['speed']
      breedCount = this.state.data['axie']['breedCount']
      classname = this.state.data['axie']['class']
    
    }catch(err){
    }
    if(ownerAddress > 0 &&  price > 0 ){
      this.setState({
        ownerAddress : ownerAddress,
        price        : price,
        listIndex    : listIndex,
        listState    : listState,
        health       : health,
        skill        : skill,
        speed        : speed,
        morale       : morale,
        breedCount   : breedCount,
        classname    : classname,
        enablebutton : true
      })
      console.log(this.state.listState,this.state.price)
      this.settleAuction()
    }
  }

  async settleAuction(){
    this.setState({
      message : 'please wait...'
    })
    
    let tx = {
      from          : walletAddress,
      to            : marketAddress,
      data          : marketContract.methods.settleAuction(this.state.ownerAddress, wethAddress, this.state.price, this.state.listIndex, this.state.listState).encodeABI(),
      gasPrice      :  '0',
      nonce         : await roninweb3.eth.getTransactionCount(walletAddress),
      gas           : '1000000',
    }

    const promise = await roninweb3.eth.accounts.signTransaction(tx, walletPrivateKey)
    await roninweb3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', () => {
        this.setState({
          price     :'',
          listIndex : '',
          listState : '',
          ownerAddress : '',
          speed      : '',
          morale     : '',
          skill      :'',
          health    : '',
          classname : '',
          breedCount : '',
        })          
      })
      .once('error', (e) => {
        console.log(e)
        this.setState({
          price     :'',
          listIndex : '',
          listState : '',
          ownerAddress : '',
          speed      : '',
          morale     : '',
          skill      :'',
          health    : '',
          classname : '',
          breedCount : '',
        }) 
      })
  }
  
  async alertmessage(){
    alert("please input id and check property value")
  }

  render() {
    const handleTokenID = (e) => {
      let addLabel  = e.target.value
      this.setState({
        tokenID : addLabel
      }) 
      console.log(this.state.tokenID)
    }
    return (
      <div>
        <br/><br/><br/><br/><br/><br/>
        <h2> Please Input Token ID </h2><hr/>
        <br/>
   
          
        <div className = "row">
          <div className="col-1"></div>
          <div className="col-10">
          <InputGroup className="mb-3 "  style = {{height : '5%'}}> 
            <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '4%', paddingRight : '4%'}}><MdInput />&nbsp;&nbsp;&nbsp;&nbsp;   Axie ID  </InputGroup.Text>
              <FormControl
                placeholder="input token id"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                defaultValue = {this.state.tokenId}
                value = {this.state.tokenID}
                onChange={handleTokenID}
                style = {{ width : '50%'}}
              />
              <Button variant="primary" id="button-addon2"  onClick={()=>this.information()} style = {{paddingLeft : '2%', paddingRight : '2%'}}>
              &nbsp;&nbsp; <BiShoppingBag/>  &nbsp;&nbsp; &nbsp;&nbsp;Buy Token 
              </Button> 
            
            </InputGroup>

          </div>
          <div className="col-1"></div>
        </div>
        <br/>
        <br/>

        <h2> Axie Property </h2><hr/><br/>
        <div className = "row">
          <div className="col-6">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '6%', paddingRight : '6%'}}><GiAlienBug/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Class Name</InputGroup.Text>
              <FormControl
                placeholder="0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.classname}
              />
            </InputGroup>
            <InputGroup className="mb-3"  >
              <InputGroup.Text id="basic-addon1"  style = {{paddingLeft : '6%', paddingRight : '6%'}}><FaBabyCarriage/> &nbsp;&nbsp;&nbsp;&nbsp;  Breed Count</InputGroup.Text>
              <FormControl
                placeholder="0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.breedCount}
              />
            </InputGroup>
          </div>
          <div className="col-6">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '5%', paddingRight : '5%'}}><FaRegAddressCard/> &nbsp;&nbsp;&nbsp; Owner Address</InputGroup.Text>
            <FormControl
              placeholder="0"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={this.state.ownerAddress}
            />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '5%', paddingRight : '5%'}}>  &nbsp;<IoPricetagOutline/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Token &nbsp;Price</InputGroup.Text>
              <FormControl
                placeholder="0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.price / 1000000000000000000}
              />
              </InputGroup>
          </div>
        </div>
       

          <br/><br/>
          <h2> Axie States  </h2><hr/><br/>
          <div className = "row">
            <div className="col-3">
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"  style = {{paddingLeft : '10%', paddingRight : '10%'}}><GiHealthPotion/> &nbsp;  Health</InputGroup.Text>
            <FormControl
                placeholder="0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.health}
              />
            </InputGroup>
            </div>
            <div className="col-3">
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '10%', paddingRight : '10%'}}><GiSpeedometer/>&nbsp;   Speed</InputGroup.Text>
            <FormControl
              placeholder="0"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={this.state.speed}
            />
            </InputGroup>
            </div>
            <div className="col-3">
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '10%', paddingRight : '10%'}}><BiUpArrowAlt/>&nbsp;  Morale</InputGroup.Text>
            <FormControl
                placeholder="0"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.morale}
              />
            </InputGroup>
            </div>
            <div className="col-3">
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '10%', paddingRight : '10%'}}><GiSwitchWeapon/>&nbsp;  Skill</InputGroup.Text>
            <FormControl
              placeholder="0"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={this.state.skill}
            />
            </InputGroup>
            </div>
          </div>
      </div>
    );
  }
}
export default DApp;