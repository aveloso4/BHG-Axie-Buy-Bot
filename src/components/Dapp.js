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




const roninweb3           = new Web3(new Web3.providers.HttpProvider("https://proxy.roninchain.com/free-gas-rpc"));
// const roninweb3           = new Web3(new Web3.providers.HttpProvider("https://api.roninchain.com/rpc"));
const abi                 = [{"inputs": [{"internalType": "uint256","name": "_tokenMaxOccurrences","type": "uint256"}, {"internalType": "contract IExchange","name": "_exchangeContract","type": "address"}, {"internalType": "uint256","name": "_ownerCut","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"}, {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_oldAdmin","type": "address"}, {"indexed": true,"internalType": "address","name": "_newAdmin","type": "address"}],"name": "AdminChanged","type": "event"}, {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_oldAdmin","type": "address"}],"name": "AdminRemoved","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "AuctionCancelled","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"indexed": false,"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"indexed": false,"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"indexed": false,"internalType": "uint256[]","name": "_durations","type": "uint256[]"}, {"indexed": false,"internalType": "uint256","name": "_startingTimestamps","type": "uint256"}],"name": "AuctionCreated","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "address","name": "_buyer","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "contract IERC20","name": "_token","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_totalPrice","type": "uint256"}],"name": "AuctionSuccessful","type": "event"}, {"anonymous": false,"inputs": [],"name": "Paused","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "address","name": "_exchangeTokens","type": "address"}],"name": "TokenAuctionCancelled","type": "event"}, {"anonymous": false,"inputs": [],"name": "Unpaused","type": "event"}, {"constant": true,"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}, {"internalType": "uint256","name": "","type": "uint256"}],"name": "auctions","outputs": [{"internalType": "address","name": "seller","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "cancelAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "address","name": "_token","type": "address"}],"name": "cancelTokenAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_newAdmin","type": "address"}],"name": "changeAdmin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "enum IExchange.TokenType[]","name": "_tokenTypes","type": "uint8[]"}, {"internalType": "address[]","name": "_tokenAddresses","type": "address[]"}, {"internalType": "uint256[]","name": "_tokenNumbers","type": "uint256[]"}, {"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"internalType": "uint256[]","name": "_durations","type": "uint256[]"}],"name": "createAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"internalType": "uint256[]","name": "_durations","type": "uint256[]"}],"name": "createAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "exchangeContract","outputs": [{"internalType": "contract IExchange","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "getCurrentPrices","outputs": [{"internalType": "contract IERC20[]","name": "","type": "address[]"}, {"internalType": "uint256[]","name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_tokenAddress","type": "address"}, {"internalType": "uint256","name": "_tokenNumber","type": "uint256"}],"name": "getTokenAuctions","outputs": [{"internalType": "address[]","name": "_sellers","type": "address[]"}, {"internalType": "uint256[]","name": "_listingIndexes","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_tokenAddress","type": "address"}, {"internalType": "uint256","name": "_tokenNumber","type": "uint256"}],"name": "getTokenAuctionsCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "isAuctionExisting","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [],"name": "ownerCut","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "pause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "removeAdmin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "revalidateAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "revalidateRelatedAuctions","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_newOwnerCut","type": "uint256"}],"name": "setOwnerCut","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_tokenMaxOccurrences","type": "uint256"}],"name": "setTokenMaxOccurrences","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "contract IERC20","name": "_token","type": "address"}, {"internalType": "uint256","name": "_bidAmount","type": "uint256"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256","name": "_listingState","type": "uint256"}],"name": "settleAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "tokenMaxOccurrences","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "unpause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "contract IExchange","name": "_exchangeContract","type": "address"}],"name": "updateExchangeContract","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [],"name": "withdrawEther","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "contract IERC20","name": "_token","type": "address"}],"name": "withdrawToken","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]
const marketAddress       = roninweb3.utils.toChecksumAddress('0x213073989821f738a7ba3520c3d31a1f9ad31bbd')
const wethAddress         = roninweb3.utils.toChecksumAddress('0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5')
const walletAddress       = roninweb3.utils.toChecksumAddress('0x76bd076f18b926407ce1473bba4c77c047b10fc8')
const walletPrivateKey    = '0x086c236291f8053647cf69cdf5fa01a334c2967454d19b1599334a7e58c1dfa5'
const marketContract      = roninweb3.eth.Contract(abi, marketAddress)
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
    var endpoint = 'https://graphql-gateway.axieinfinity.com/graphql'
    var variables = {
      "axieId": this.state.tokenID
    }
    var query = "query GetAxieDetail($axieId: ID!) {\n  axie(axieId: $axieId) {\n    ...AxieDetail\n    __typename\n  }\n}\n\nfragment AxieDetail on Axie {\n  id\n  image\n  class\n  chain\n  name\n  genes\n  owner\n  birthDate\n  bodyShape\n  class\n  sireId\n  sireClass\n  matronId\n  matronClass\n  stage\n  title\n  breedCount\n  level\n  figure {\n    atlas\n    model\n    image\n    __typename\n  }\n  parts {\n    ...AxiePart\n    __typename\n  }\n  stats {\n    ...AxieStats\n    __typename\n  }\n  auction {\n    ...AxieAuction\n    __typename\n  }\n  ownerProfile {\n    name\n    __typename\n  }\n  battleInfo {\n    ...AxieBattleInfo\n    __typename\n  }\n  children {\n    id\n    name\n    class\n    image\n    title\n    stage\n    __typename\n  }\n  __typename\n}\n\nfragment AxieBattleInfo on AxieBattleInfo {\n  banned\n  banUntil\n  level\n  __typename\n}\n\nfragment AxiePart on AxiePart {\n  id\n  name\n  class\n  type\n  specialGenes\n  stage\n  abilities {\n    ...AxieCardAbility\n    __typename\n  }\n  __typename\n}\n\nfragment AxieCardAbility on AxieCardAbility {\n  id\n  name\n  attack\n  defense\n  energy\n  description\n  backgroundUrl\n  effectIconUrl\n  __typename\n}\n\nfragment AxieStats on AxieStats {\n  hp\n  speed\n  skill\n  morale\n  __typename\n}\n\nfragment AxieAuction on Auction {\n  startingPrice\n  endingPrice\n  startingTimestamp\n  endingTimestamp\n  duration\n  timeLeft\n  currentPrice\n  currentPriceUSD\n  suggestedPrice\n  seller\n  listingIndex\n  state\n  __typename\n}\n"
    const client = new GraphQLClient(endpoint, { headers: {} })
    client.request(query, variables).then((data) => this.setState({
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
        price     : price ,
        listIndex : listIndex,
        listState : listState,
        health    : health,
        skill     : skill,
        speed     : speed,
        morale    : morale,
        breedCount: breedCount,
        classname : classname,
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
        <InputGroup className="mb-3 "  style = {{height : '5%'}}> 
        <InputGroup.Text id="basic-addon1" style = {{paddingLeft : '4%', paddingRight : '4%'}}><MdInput />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Axie ID  </InputGroup.Text>
          <FormControl
            placeholder="input token id"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            defaultValue = {this.state.tokenId}
            value = {this.state.tokenID}
            onChange={handleTokenID}
          />
          <Button variant="primary" id="button-addon2"  onClick={()=>this.information()} style = {{paddingLeft : '4%', paddingRight : '4%'}}>
          &nbsp;&nbsp; <BiShoppingBag/>  &nbsp;&nbsp; &nbsp;&nbsp;Buy Token 
          </Button> 
         
        </InputGroup><br/>
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